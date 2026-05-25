const express = require('express');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
const db = new Database('hiking.db');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Schema
db.exec(`
  CREATE TABLE IF NOT EXISTS trails (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    trail_name TEXT NOT NULL,
    nearest_town TEXT,
    driving_dist TEXT,
    has_lake INTEGER DEFAULT 0,
    water_feature_details TEXT,
    difficulty TEXT CHECK(difficulty IN ('Easy','Moderate','Hard')),
    length TEXT,
    elevation_gain TEXT,
    lat REAL,
    lng REAL,
    alltrails_link TEXT,
    completed INTEGER DEFAULT 0,
    notes TEXT,
    canonical_id TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS hike_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    trail_id INTEGER NOT NULL REFERENCES trails(id) ON DELETE CASCADE,
    hiked_date TEXT NOT NULL,
    note TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );
  CREATE INDEX IF NOT EXISTS idx_hike_logs_trail ON hike_logs(trail_id);
`);

// Migration: add canonical_id to databases created before this column existed
try { db.exec('ALTER TABLE trails ADD COLUMN canonical_id TEXT'); } catch(e) {}
db.exec('CREATE UNIQUE INDEX IF NOT EXISTS idx_trails_canonical ON trails(canonical_id) WHERE canonical_id IS NOT NULL');

// Canonical trail list — the source of truth.
// INSERT OR IGNORE keyed on canonical_id means:
//   • First run: all 45 rows are inserted
//   • Later runs: existing rows are skipped (user data like notes/completed/logs is preserved)
//   • Deleted rows: re-inserted on next restart
const CANONICAL_TRAILS = [
  { canonical_id: 'hells-hole-trail',          trail_name: 'Hells Hole Trail',            nearest_town: 'Idaho Springs, CO', driving_dist: '~40 mi',  has_lake: 0, water_feature_details: 'Ends in a glacial cirque; no lake.',                          difficulty: 'Hard',     length: '~8.0 mi',  elevation_gain: '~1,900 ft', lat: 39.6644, lng: -105.6253, alltrails_link: '' },
  { canonical_id: 'red-rock-lake',             trail_name: 'Red Rock Lake',                nearest_town: 'Ward, CO',          driving_dist: '~47 mi',  has_lake: 1, water_feature_details: 'Easily accessible mirrored lake.',                            difficulty: 'Easy',     length: '~0.5 mi',  elevation_gain: '~25 ft',    lat: 40.0881, lng: -105.5451, alltrails_link: '' },
  { canonical_id: 'square-top-lakes',          trail_name: 'Square Top Lakes',             nearest_town: 'Georgetown, CO',    driving_dist: '~48 mi',  has_lake: 1, water_feature_details: 'Two high-alpine lakes with views of Mt. Bierstadt.',           difficulty: 'Moderate', length: '~4.1 mi',  elevation_gain: '~900 ft',   lat: 39.5936, lng: -105.7322, alltrails_link: '' },
  { canonical_id: 'silver-dollar-murray-lakes', trail_name: 'Silver Dollar & Murray Lakes', nearest_town: 'Georgetown, CO',    driving_dist: '~48 mi',  has_lake: 1, water_feature_details: 'Passes Naylor Lake; hits Silver Dollar & Murray.',            difficulty: 'Moderate', length: '~4.2 mi',  elevation_gain: '~1,073 ft', lat: 39.6389, lng: -105.7533, alltrails_link: '' },
  { canonical_id: 'brainard-lake-loop',        trail_name: 'Brainard Lake Loop',           nearest_town: 'Ward, CO',          driving_dist: '~49 mi',  has_lake: 1, water_feature_details: 'Main lake; paved/gravel path.',                               difficulty: 'Easy',     length: '~1.5 mi',  elevation_gain: '~50 ft',    lat: 40.0782, lng: -105.5765, alltrails_link: '' },
  { canonical_id: 'mitchell-lake',             trail_name: 'Mitchell Lake',                nearest_town: 'Ward, CO',          driving_dist: '~49 mi',  has_lake: 1, water_feature_details: 'Quick hike to a high alpine lake.',                            difficulty: 'Easy',     length: '~1.8 mi',  elevation_gain: '~230 ft',   lat: 40.0831, lng: -105.5841, alltrails_link: '' },
  { canonical_id: 'long-lake-loop',            trail_name: 'Long Lake Loop',               nearest_town: 'Ward, CO',          driving_dist: '~49 mi',  has_lake: 1, water_feature_details: 'Flat loop around a massive lake.',                             difficulty: 'Easy',     length: '~2.8 mi',  elevation_gain: '~180 ft',   lat: 40.0768, lng: -105.5891, alltrails_link: '' },
  { canonical_id: 'lefthand-reservoir',        trail_name: 'Lefthand Reservoir',           nearest_town: 'Ward, CO',          driving_dist: '~50 mi',  has_lake: 1, water_feature_details: 'Open reservoir via service road.',                             difficulty: 'Easy',     length: '~4.0 mi',  elevation_gain: '~615 ft',   lat: 40.0722, lng: -105.5424, alltrails_link: '' },
  { canonical_id: 'lower-crater-lakes',        trail_name: 'Lower Crater Lakes',           nearest_town: 'Rollinsville, CO',  driving_dist: '~51 mi',  has_lake: 1, water_feature_details: 'Reaches two alpine lakes (Lower and Upper).',                  difficulty: 'Moderate', length: '~5.5 mi',  elevation_gain: '~1,400 ft', lat: 39.9161, lng: -105.6744, alltrails_link: '' },
  { canonical_id: 'lost-lake-hessie',         trail_name: 'Lost Lake via Hessie TH',      nearest_town: 'Nederland, CO',     driving_dist: '~53 mi',  has_lake: 1, water_feature_details: 'Very popular lake with a waterfall along the way.',            difficulty: 'Moderate', length: '~4.0 mi',  elevation_gain: '~830 ft',   lat: 39.9547, lng: -105.6158, alltrails_link: '' },
  { canonical_id: 'lake-isabelle-jean-lunning', trail_name: 'Lake Isabelle / Jean Lunning', nearest_town: 'Nederland, CO',     driving_dist: '~54 mi',  has_lake: 1, water_feature_details: 'Loops Long Lake and leads to Lake Isabelle.',                 difficulty: 'Moderate', length: '~4.4 mi',  elevation_gain: '~475 ft',   lat: 40.0811, lng: -105.5831, alltrails_link: '' },
  { canonical_id: 'diamond-lake',             trail_name: 'Diamond Lake',                 nearest_town: 'Nederland, CO',     driving_dist: '~58 mi',  has_lake: 1, water_feature_details: 'Stunning alpine lake; starts at 10,000 ft.',                   difficulty: 'Moderate', length: '~5.0 mi',  elevation_gain: '~1,220 ft', lat: 39.9602, lng: -105.6322, alltrails_link: '' },
  { canonical_id: 'blue-lake-mitchell-lake',   trail_name: 'Blue Lake / Mitchell Lake',    nearest_town: 'Ward, CO',          driving_dist: '~59 mi',  has_lake: 1, water_feature_details: 'Passes Mitchell Lake; ends at Blue Lake.',                     difficulty: 'Moderate', length: '~6.2 mi',  elevation_gain: '~994 ft',   lat: 40.0911, lng: -105.6022, alltrails_link: '' },
  { canonical_id: 'ouzel-falls',              trail_name: 'Ouzel Falls',                  nearest_town: 'Allenspark, CO',    driving_dist: '~68 mi',  has_lake: 0, water_feature_details: 'Ends at a massive waterfall; no lake.',                         difficulty: 'Moderate', length: '~5.7 mi',  elevation_gain: '~1,085 ft', lat: 40.2031, lng: -105.6042, alltrails_link: '' },
  { canonical_id: 'ouzel-lake-trail',         trail_name: 'Ouzel Lake Trail',             nearest_town: 'Allenspark, CO',    driving_dist: '~68 mi',  has_lake: 1, water_feature_details: 'A quiet, lily-pad covered alpine lake.',                        difficulty: 'Moderate', length: '~9.8 mi',  elevation_gain: '~1,510 ft', lat: 40.2036, lng: -105.6044, alltrails_link: '' },
  { canonical_id: 'brady-lake-trail',         trail_name: 'Brady Lake Trail',             nearest_town: 'Minturn, CO',       driving_dist: '~105 mi', has_lake: 1, water_feature_details: 'High-alpine lake tucked below a ridge.',                        difficulty: 'Moderate', length: '~4.3 mi',  elevation_gain: '~710 ft',   lat: 39.3621, lng: -106.5122, alltrails_link: '' },
  { canonical_id: 'missouri-fancy-lakes',     trail_name: 'Missouri & Fancy Lakes',       nearest_town: 'Minturn, CO',       driving_dist: '~105 mi', has_lake: 1, water_feature_details: 'Features Missouri Lakes and Fancy Lake.',                       difficulty: 'Hard',     length: '~8.8 mi',  elevation_gain: '~2,500 ft', lat: 39.3883, lng: -106.5683, alltrails_link: '' },
  { canonical_id: 'surprise-lake',            trail_name: 'Surprise Lake',                nearest_town: 'Minturn, CO',       driving_dist: '~108 mi', has_lake: 1, water_feature_details: 'A small, serene lake in dense forest.',                         difficulty: 'Moderate', length: '~5.4 mi',  elevation_gain: '~1,450 ft', lat: 39.5601, lng: -106.3211, alltrails_link: '' },
  { canonical_id: 'whitney-lake-trail',       trail_name: 'Whitney Lake Trail',           nearest_town: 'Minturn, CO',       driving_dist: '~112 mi', has_lake: 1, water_feature_details: 'Alpine lake at the base of Whitney Peak.',                      difficulty: 'Moderate', length: '~5.1 mi',  elevation_gain: '~1,250 ft', lat: 39.3789, lng: -106.5022, alltrails_link: '' },
  { canonical_id: 'linkins-lake-trail',       trail_name: 'Linkins Lake Trail',           nearest_town: 'Twin Lakes, CO',    driving_dist: '~126 mi', has_lake: 1, water_feature_details: 'High-tundra lake; very short but steep.',                       difficulty: 'Moderate', length: '~1.4 mi',  elevation_gain: '~440 ft',   lat: 39.1121, lng: -106.5612, alltrails_link: '' },
  { canonical_id: 'petroleum-anderson',       trail_name: 'Petroleum & Anderson',         nearest_town: 'Aspen, CO',         driving_dist: '~140 mi', has_lake: 1, water_feature_details: 'Two lakes; Petroleum is the larger basin.',                     difficulty: 'Moderate', length: '~4.2 mi',  elevation_gain: '~1,269 ft', lat: 39.0621, lng: -106.7021, alltrails_link: '' },
  { canonical_id: 'lake-agnes-trail',         trail_name: 'Lake Agnes Trail',             nearest_town: 'Gould, CO',         driving_dist: '~146 mi', has_lake: 1, water_feature_details: 'Iconic lake with an island and rock walls.',                    difficulty: 'Moderate', length: '~1.7 mi',  elevation_gain: '~450 ft',   lat: 40.4853, lng: -105.8978, alltrails_link: '' },
  { canonical_id: 'michigan-american-lakes',  trail_name: 'Michigan (American) Lakes',    nearest_town: 'Gould, CO',         driving_dist: '~146 mi', has_lake: 1, water_feature_details: 'Two large lakes in a wide alpine basin.',                       difficulty: 'Moderate', length: '~7.4 mi',  elevation_gain: '~1,500 ft', lat: 40.4721, lng: -105.9121, alltrails_link: '' },
  { canonical_id: 'savage-lakes-trail',       trail_name: 'Savage Lakes Trail',           nearest_town: 'Meredith, CO',      driving_dist: '~158 mi', has_lake: 1, water_feature_details: 'Reaches Lower Savage Lake.',                                   difficulty: 'Moderate', length: '~2.8 mi',  elevation_gain: '~1,250 ft', lat: 39.2922, lng: -106.5789, alltrails_link: '' },
  { canonical_id: 'chapman-trail',            trail_name: 'Chapman Trail',                nearest_town: 'Meredith, CO',      driving_dist: '~159 mi', has_lake: 0, water_feature_details: 'Follows the river; terminates at road.',                        difficulty: 'Moderate', length: '~3.5 mi',  elevation_gain: '~1,100 ft', lat: 39.2851, lng: -106.6342, alltrails_link: '' },
  { canonical_id: 'sawyer-creek-trail',       trail_name: 'Sawyer Creek Trail',           nearest_town: 'Meredith, CO',      driving_dist: '~161 mi', has_lake: 0, water_feature_details: 'Follows a creek to a high ridge; no lake.',                    difficulty: 'Moderate', length: '~4.0 mi',  elevation_gain: '~750 ft',   lat: 39.2941, lng: -106.6022, alltrails_link: '' },
  { canonical_id: 'mill-lake-trail',          trail_name: 'Mill Lake Trail',              nearest_town: 'Ohio City, CO',     driving_dist: '~172 mi', has_lake: 1, water_feature_details: 'Tucked in the Fossil Ridge Wilderness.',                        difficulty: 'Moderate', length: '~3.8 mi',  elevation_gain: '~1,440 ft', lat: 38.5942, lng: -106.5412, alltrails_link: '' },
  { canonical_id: 'sloan-lake',               trail_name: 'Sloan Lake',                   nearest_town: 'Lake City, CO',     driving_dist: '~250 mi', has_lake: 1, water_feature_details: 'High alpine cirque (American Basin).',                          difficulty: 'Moderate', length: '~3.2 mi',  elevation_gain: '~1,320 ft', lat: 37.9189, lng: -107.5022, alltrails_link: '' },
  { canonical_id: 'larson-lakes',             trail_name: 'Larson Lakes',                 nearest_town: 'Lake City, CO',     driving_dist: '~255 mi', has_lake: 1, water_feature_details: 'Forested lakes; good fishing.',                                 difficulty: 'Moderate', length: '~3.0 mi',  elevation_gain: '~600 ft',   lat: 37.9321, lng: -107.3012, alltrails_link: '' },
  { canonical_id: 'poage-lake',               trail_name: 'Poage Lake',                   nearest_town: 'Creede, CO',        driving_dist: '~260 mi', has_lake: 1, water_feature_details: 'Easy walk to massive cliff walls.',                             difficulty: 'Easy',     length: '~1.0 mi',  elevation_gain: '~100 ft',   lat: 37.7121, lng: -106.8522, alltrails_link: '' },
  { canonical_id: 'full-moon-lake',           trail_name: 'Full Moon Lake',               nearest_town: 'Creede, CO',        driving_dist: '~262 mi', has_lake: 1, water_feature_details: 'Remote high-alpine destination.',                               difficulty: 'Moderate', length: '~6.0 mi',  elevation_gain: '~1,400 ft', lat: 37.7421, lng: -106.9122, alltrails_link: '' },
  { canonical_id: 'waterdog-lakes',           trail_name: 'Waterdog Lakes',               nearest_town: 'Lake City, CO',     driving_dist: '~265 mi', has_lake: 1, water_feature_details: 'Two lakes sitting at tree line.',                               difficulty: 'Moderate', length: '~3.8 mi',  elevation_gain: '~1,250 ft', lat: 38.4921, lng: -106.3512, alltrails_link: '' },
  { canonical_id: 'emerald-lake',             trail_name: 'Emerald Lake',                 nearest_town: 'Lake City, CO',     driving_dist: '~270 mi', has_lake: 1, water_feature_details: 'Tucked in the Weminuche Wilderness.',                           difficulty: 'Moderate', length: '~3.6 mi',  elevation_gain: '~770 ft',   lat: 37.5621, lng: -107.4512, alltrails_link: '' },
  { canonical_id: 'geyser-spring',            trail_name: 'Geyser Spring',                nearest_town: 'Dunton, CO',        driving_dist: '~295 mi', has_lake: 0, water_feature_details: 'Bubbling geyser pool.',                                         difficulty: 'Moderate', length: '~2.8 mi',  elevation_gain: '~600 ft',   lat: 37.7536, lng: -108.0933, alltrails_link: '' },
  { canonical_id: 'crystal-lake',             trail_name: 'Crystal Lake',                 nearest_town: 'Ouray, CO',         driving_dist: '~300 mi', has_lake: 1, water_feature_details: 'Mirror lake off Red Mountain Pass.',                            difficulty: 'Moderate', length: '~4.0 mi',  elevation_gain: '~1,000 ft', lat: 37.9221, lng: -107.7122, alltrails_link: '' },
  { canonical_id: 'spud-potato-lake',         trail_name: 'Spud (Potato) Lake',           nearest_town: 'Silverton, CO',     driving_dist: '~305 mi', has_lake: 1, water_feature_details: 'Lily-pad lake; family friendly.',                               difficulty: 'Easy',     length: '~2.0 mi',  elevation_gain: '~400 ft',   lat: 37.6921, lng: -107.7812, alltrails_link: '' },
  { canonical_id: 'lower-blue-lake',          trail_name: 'Lower Blue Lake',              nearest_town: 'Ridgway, CO',       driving_dist: '~310 mi', has_lake: 1, water_feature_details: 'Iconic "San Juan Blue" water.',                                 difficulty: 'Moderate', length: '~6.3 mi',  elevation_gain: '~1,590 ft', lat: 38.0169, lng: -107.8022, alltrails_link: '' },
  { canonical_id: 'highland-mary-lakes',      trail_name: 'Highland Mary Lakes',          nearest_town: 'Silverton, CO',     driving_dist: '~315 mi', has_lake: 1, water_feature_details: 'High tundra lake series.',                                      difficulty: 'Moderate', length: '~6.0 mi',  elevation_gain: '~1,730 ft', lat: 37.7812, lng: -107.5812, alltrails_link: '' },
  { canonical_id: 'ice-lake-island',          trail_name: 'Ice Lake & Island',            nearest_town: 'Silverton, CO',     driving_dist: '~320 mi', has_lake: 1, water_feature_details: 'Famous turquoise basin.',                                        difficulty: 'Hard',     length: '~7.0 mi',  elevation_gain: '~2,600 ft', lat: 37.8286, lng: -107.7772, alltrails_link: '' },
  { canonical_id: 'priest-lake',              trail_name: 'Priest Lake',                  nearest_town: 'Rico, CO',          driving_dist: '~322 mi', has_lake: 1, water_feature_details: 'Serene, accessible high lake.',                                 difficulty: 'Easy',     length: '~2.5 mi',  elevation_gain: '~350 ft',   lat: 37.8122, lng: -107.9022, alltrails_link: '' },
  { canonical_id: 'hope-lake',                trail_name: 'Hope Lake',                    nearest_town: 'Ophir, CO',         driving_dist: '~325 mi', has_lake: 1, water_feature_details: 'Brilliant blue; highly scenic.',                                 difficulty: 'Moderate', length: '~6.0 mi',  elevation_gain: '~1,515 ft', lat: 37.8151, lng: -107.8422, alltrails_link: '' },
  { canonical_id: 'bridal-veil-to-blue',      trail_name: 'Bridal Veil to Blue',          nearest_town: 'Telluride, CO',     driving_dist: '~330 mi', has_lake: 1, water_feature_details: 'Passes falls to a high basin.',                                 difficulty: 'Moderate', length: '~6.0 mi',  elevation_gain: '~1,820 ft', lat: 37.9192, lng: -107.7681, alltrails_link: '' },
  { canonical_id: 'fish-creek-reservoir',     trail_name: 'Fish Creek Reservoir',         nearest_town: 'Dunton, CO',        driving_dist: '~335 mi', has_lake: 1, water_feature_details: 'Secluded high-basin reservoirs.',                               difficulty: 'Moderate', length: '~4.6 mi',  elevation_gain: '~800 ft',   lat: 37.7822, lng: -108.0412, alltrails_link: '' },
  { canonical_id: 'navajo-lake',              trail_name: 'Navajo Lake',                  nearest_town: 'Dunton, CO',        driving_dist: '~340 mi', has_lake: 1, water_feature_details: 'Remote lake below Mt. Wilson.',                                  difficulty: 'Moderate', length: '~9.2 mi',  elevation_gain: '~1,830 ft', lat: 37.8544, lng: -108.0222, alltrails_link: '' },
  { canonical_id: 'rice-lake',                trail_name: 'Rice Lake',                    nearest_town: 'Dunton, CO',        driving_dist: '~345 mi', has_lake: 1, water_feature_details: 'Extreme solitude in high alpine.',                               difficulty: 'Moderate', length: '~5.0 mi',  elevation_gain: '~1,200 ft', lat: 37.8612, lng: -108.0312, alltrails_link: '' },
];

// Sync on every startup: insert missing canonical trails, backfill canonical_id on old rows
const syncStmt = db.prepare(`
  INSERT OR IGNORE INTO trails
    (canonical_id, trail_name, nearest_town, driving_dist, has_lake, water_feature_details,
     difficulty, length, elevation_gain, lat, lng, alltrails_link)
  VALUES
    (@canonical_id, @trail_name, @nearest_town, @driving_dist, @has_lake, @water_feature_details,
     @difficulty, @length, @elevation_gain, @lat, @lng, @alltrails_link)
`);
const backfillStmt = db.prepare(`
  UPDATE trails SET canonical_id = @canonical_id
  WHERE trail_name = @trail_name AND canonical_id IS NULL
`);
db.transaction(trails => {
  trails.forEach(t => { syncStmt.run(t); backfillStmt.run(t); });
})(CANONICAL_TRAILS);

const synced = db.prepare('SELECT COUNT(*) as c FROM trails WHERE canonical_id IS NOT NULL').get().c;
console.log(`Canonical sync complete — ${synced} of ${CANONICAL_TRAILS.length} trails confirmed in DB`);

// --- API Routes ---

app.get('/api/trails', (req, res) => {
  const { search, difficulty, has_lake, completed } = req.query;
  let sql = `
    SELECT t.*,
      COUNT(l.id) as log_count,
      MAX(l.hiked_date) as last_hiked
    FROM trails t
    LEFT JOIN hike_logs l ON l.trail_id = t.id
    WHERE 1=1`;
  const params = [];

  if (search) {
    sql += ' AND (t.trail_name LIKE ? OR t.nearest_town LIKE ? OR t.water_feature_details LIKE ?)';
    const s = `%${search}%`;
    params.push(s, s, s);
  }
  if (difficulty) { sql += ' AND t.difficulty = ?'; params.push(difficulty); }
  if (has_lake !== undefined && has_lake !== '') { sql += ' AND t.has_lake = ?'; params.push(Number(has_lake)); }
  if (completed !== undefined && completed !== '') { sql += ' AND t.completed = ?'; params.push(Number(completed)); }

  sql += ' GROUP BY t.id ORDER BY t.trail_name ASC';
  res.json(db.prepare(sql).all(...params));
});

app.get('/api/trails/:id', (req, res) => {
  const trail = db.prepare('SELECT * FROM trails WHERE id = ?').get(req.params.id);
  if (!trail) return res.status(404).json({ error: 'Not found' });
  res.json(trail);
});

app.post('/api/trails', (req, res) => {
  const { trail_name, nearest_town, driving_dist, has_lake, water_feature_details,
          difficulty, length, elevation_gain, lat, lng, alltrails_link, notes } = req.body;
  if (!trail_name) return res.status(400).json({ error: 'trail_name is required' });
  const result = db.prepare(`
    INSERT INTO trails (trail_name, nearest_town, driving_dist, has_lake, water_feature_details,
      difficulty, length, elevation_gain, lat, lng, alltrails_link, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(trail_name, nearest_town, driving_dist, has_lake ? 1 : 0, water_feature_details,
         difficulty, length, elevation_gain, lat, lng, alltrails_link, notes);
  res.status(201).json(db.prepare('SELECT * FROM trails WHERE id = ?').get(result.lastInsertRowid));
});

app.put('/api/trails/:id', (req, res) => {
  const trail = db.prepare('SELECT * FROM trails WHERE id = ?').get(req.params.id);
  if (!trail) return res.status(404).json({ error: 'Not found' });
  const fields = ['trail_name','nearest_town','driving_dist','has_lake','water_feature_details',
                  'difficulty','length','elevation_gain','lat','lng','alltrails_link','completed','notes'];
  const updates = {};
  fields.forEach(f => { if (req.body[f] !== undefined) updates[f] = req.body[f]; });
  if (Object.keys(updates).length === 0) return res.json(trail);

  const setClauses = Object.keys(updates).map(k => `${k} = ?`).join(', ');
  const values = Object.values(updates).map(v => typeof v === 'boolean' ? (v ? 1 : 0) : v);
  db.prepare(`UPDATE trails SET ${setClauses}, updated_at = datetime('now') WHERE id = ?`)
    .run(...values, req.params.id);
  res.json(db.prepare('SELECT * FROM trails WHERE id = ?').get(req.params.id));
});

app.delete('/api/trails/:id', (req, res) => {
  const result = db.prepare('DELETE FROM trails WHERE id = ?').run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Not found' });
  res.status(204).end();
});

// Toggle completed
app.patch('/api/trails/:id/complete', (req, res) => {
  const trail = db.prepare('SELECT * FROM trails WHERE id = ?').get(req.params.id);
  if (!trail) return res.status(404).json({ error: 'Not found' });
  db.prepare(`UPDATE trails SET completed = ?, updated_at = datetime('now') WHERE id = ?`)
    .run(trail.completed ? 0 : 1, req.params.id);
  res.json(db.prepare('SELECT * FROM trails WHERE id = ?').get(req.params.id));
});

// Hike log routes
app.get('/api/trails/:id/logs', (req, res) => {
  const trail = db.prepare('SELECT id FROM trails WHERE id = ?').get(req.params.id);
  if (!trail) return res.status(404).json({ error: 'Not found' });
  const logs = db.prepare('SELECT * FROM hike_logs WHERE trail_id = ? ORDER BY hiked_date DESC').all(req.params.id);
  res.json(logs);
});

app.post('/api/trails/:id/logs', (req, res) => {
  const trail = db.prepare('SELECT id FROM trails WHERE id = ?').get(req.params.id);
  if (!trail) return res.status(404).json({ error: 'Not found' });
  const { hiked_date, note } = req.body;
  if (!hiked_date) return res.status(400).json({ error: 'hiked_date is required' });
  const result = db.prepare('INSERT INTO hike_logs (trail_id, hiked_date, note) VALUES (?, ?, ?)').run(req.params.id, hiked_date, note || null);
  // auto-mark trail completed on first log
  db.prepare(`UPDATE trails SET completed = 1, updated_at = datetime('now') WHERE id = ?`).run(req.params.id);
  res.status(201).json(db.prepare('SELECT * FROM hike_logs WHERE id = ?').get(result.lastInsertRowid));
});

app.delete('/api/logs/:id', (req, res) => {
  const result = db.prepare('DELETE FROM hike_logs WHERE id = ?').run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Not found' });
  res.status(204).end();
});

app.get('/api/stats', (req, res) => {
  const total = db.prepare('SELECT COUNT(*) as c FROM trails').get().c;
  const completed = db.prepare('SELECT COUNT(*) as c FROM trails WHERE completed=1').get().c;
  const withLake = db.prepare('SELECT COUNT(*) as c FROM trails WHERE has_lake=1').get().c;
  const byDiff = db.prepare('SELECT difficulty, COUNT(*) as c FROM trails GROUP BY difficulty').all();
  res.json({ total, completed, withLake, byDiff });
});

const PORT = process.env.HIKING_PORT || 3001;
app.listen(PORT, () => console.log(`Hiking server running on http://localhost:${PORT}`));
