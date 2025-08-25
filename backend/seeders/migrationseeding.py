import pandas as pd
import sqlite3

# Read CSV
df = pd.read_csv('newOne.csv')

# Connect to database
conn = sqlite3.connect('myapp.db')

# Import to SQLite (if_exists='replace' will overwrite existing data)
df.to_sql('Things', conn, if_exists='append', index=False)

conn.close()