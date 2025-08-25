import csv
import hashlib
import os

def hash_csv_column(input_filename, output_filename, column_to_hash='name', hash_length=15):

    try:
        # Check if the input file exists
        if not os.path.exists(input_filename):
            print(f"Error: The file '{input_filename}' was not found.")
            return

        with open(input_filename, 'r', newline='', encoding='utf-8') as infile, \
             open(output_filename, 'w', newline='', encoding='utf-8') as outfile:

            reader = csv.reader(infile)
            writer = csv.writer(outfile)

            # Read and write the header row
            header = next(reader)
            writer.writerow(header)

            # Find the index of the column to hash
            try:
                # Use .lower() to make the column name match case-insensitive
                col_index = [h.lower() for h in header].index(column_to_hash.lower())
            except ValueError:
                print(f"Error: Column '{column_to_hash}' not found in the CSV header.")
                return

            # Process each row and hash the specified column
            for row in reader:
                # Handle potential IndexError for empty rows or corrupted data
                if len(row) > col_index:
                    original_name = row[col_index]

                    # Hash the name using SHA-256 and truncate the result
                    hashed_name = hashlib.sha256(original_name.encode('utf-8')).hexdigest()
                    truncated_hash = hashed_name[:hash_length]

                    # Create a new row with the hashed name and write it
                    new_row = row
                    new_row[col_index] = truncated_hash
                    writer.writerow(new_row)
                else:
                    # If a row is too short, just write it as is to avoid errors
                    writer.writerow(row)

        print(f"Successfully hashed the '{column_to_hash}' column.")
        print(f"The modified data has been saved to '{output_filename}'.")

    except Exception as e:
        print(f"An error occurred: {e}")

input_file = 'finalstuffalt.csv'
output_file = 'finalstuff'
column_to_hash = 'Name'
   
hash_csv_column(input_file, output_file, column_to_hash)


