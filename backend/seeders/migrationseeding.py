import pandas as pd
import sqlite3

# Read CSV
df = pd.read_csv('newOne.csv')

# Connect to database
conn = sqlite3.connect('../myapp.db')

# Import to SQLite (if_exists='replace' will overwrite existing data)
df.to_sql('Things', conn, if_exists='append', index=False)

conn.close()

# totalCrime

# Read CSV
df = pd.read_csv('totalCrime.csv')

# Connect to database
conn = sqlite3.connect('../myapp.db')

# Import to SQLite (if_exists='replace' will overwrite existing data)
df.to_sql('TotalCrimes', conn, if_exists='append', index=False)

conn.close()

# judgeCrimes

df = pd.read_csv('judgeCrimes.csv')

# Connect to database
conn = sqlite3.connect('../myapp.db')

# Import to SQLite (if_exists='replace' will overwrite existing data)
df.to_sql('JudgeCrimes', conn, if_exists='append', index=False)

conn.close()

# judgeList

df = pd.read_csv('judgeList.csv')

# Connect to database
conn = sqlite3.connect('../myapp.db')

# Import to SQLite (if_exists='replace' will overwrite existing data)
df.to_sql('Judges', conn, if_exists='append', index=False)

conn.close()

# countyCrimes

df = pd.read_csv('countyCrimes.csv')

conn = sqlite3.connect('../myapp.db')
df.to_sql('CountyCrimes', conn, if_exists='append', index=False)

conn.close()