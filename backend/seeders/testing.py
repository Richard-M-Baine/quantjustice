import chardet

with open("textcsv.csv", "rb") as f:
    raw_data = f.read(50000)  # read first 50k bytes
    result = chardet.detect(raw_data)

print(result)