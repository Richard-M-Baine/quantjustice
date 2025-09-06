import pandas as pd
import sqlite3

DB_PATH = "../myapp.db"

def import_csv_to_sqlite(csv_file, table_name, encoding="utf-8", clean=True):
    df = pd.read_csv(csv_file, encoding=encoding)

    if clean:
        df.columns = df.columns.str.strip()
        df = df.map(lambda x: x.strip() if isinstance(x, str) else x)

    with sqlite3.connect(DB_PATH) as conn:
        if table_name == "JudgeCrimes":
            # Load Judges table into memory
            judges_df = pd.read_sql("SELECT id, Judge, County FROM Judges", conn)

            # Merge JudgeCrimes data with Judges table
            merged = df.merge(
                judges_df,
                how="left",
                left_on=["Judge", "County"],
                right_on=["Judge", "County"]
            )

            # Separate matched vs unmatched
            matched = merged[merged["id"].notnull()].copy()
            unmatched = merged[merged["id"].isnull()].copy()

            if not unmatched.empty:
                print("⚠️ WARNING: Some JudgeCrimes rows could not be matched to Judges table!")
                print(unmatched[["Judge", "County"]].drop_duplicates())

            # Use JudgeId for FK
            matched = matched.rename(columns={"id": "JudgeId"})

            # Drop extra columns (keep JudgeId instead)
            matched = matched[df.columns.tolist() + ["JudgeId"]]

            matched.to_sql(table_name, conn, if_exists="append", index=False)
        else:
            df.to_sql(table_name, conn, if_exists="append", index=False)

    print(f"{table_name} clear ✅")


# Import all datasets
import_csv_to_sqlite("newOne.csv", "Things")
import_csv_to_sqlite("totalCrime.csv", "TotalCrimes")
import_csv_to_sqlite("judgeList.csv", "Judges")
import_csv_to_sqlite("judgeCrimes.csv", "JudgeCrimes")
import_csv_to_sqlite("countyCrimes.csv", "CountyCrimes")
import_csv_to_sqlite("textcsv.csv", "Kettlehundes", encoding="cp1252")
import_csv_to_sqlite("nationWideOne.csv", "nationOnes", encoding="cp1252")
import_csv_to_sqlite("nationTwo.csv", "TwoNations", encoding="cp1252")