# /// script
# dependencies = ['requests']
# ///

import requests
import xml.etree.ElementTree as ET
import json
from datetime import date

URL = "https://raw.githubusercontent.com/unicode-org/cldr/main/common/supplemental/supplementalData.xml"


def fetch_xml(url: str) -> str:
    resp = requests.get(url)
    resp.raise_for_status()
    return resp.text


def build_currency_map(xml_text: str) -> dict:
    root = ET.fromstring(xml_text)

    # Find <currencyData><region> elements
    currency_data = root.find("currencyData")
    regions = currency_data.findall("region")

    result = {}
    today = date.today()

    for region in regions:
        region_code = region.attrib["iso3166"]
        currencies = region.findall("currency")

        current_code = None
        for c in currencies:
            code = c.attrib["iso4217"]

            # tender="false" means it's not legal tender (skip)
            if c.attrib.get("tender", "true") == "false":
                continue

            to_date = c.attrib.get("to")
            if to_date:
                # Skip expired currencies
                if date.fromisoformat(to_date) < today:
                    continue

            # If no `to` or still valid, we take it as current
            current_code = code

        if current_code:
            result[region_code] = current_code

    return result


def main():
    xml_text = fetch_xml(URL)
    mapping = build_currency_map(xml_text)

    with open("territoryCurrency.json", "w", encoding="utf-8") as f:
        json.dump(mapping, f, ensure_ascii=False, indent=2)

    print("Written to territoryCurrency.json")
    print("Sample:", dict(list(mapping.items())[:10]))


if __name__ == "__main__":
    main()
