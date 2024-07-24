import os
import pandas as pd
from fpdf import FPDF
from unidecode import unidecode
import textwrap
from tqdm import tqdm

fin_news = pd.read_csv("./data/analyst_ratings_processed.csv", usecols=["title", "date", "stock"]) # Financial news

gen_news = pd.read_csv("./data/bbc_news.csv") # General news

def fin_news_to_pdf(fin_news):
    a4_width_mm = 210
    pt_to_mm = 0.35
    fontsize_pt = 10
    margin_bottom_mm = 10

    character_width_mm = 7 * pt_to_mm
    width_text = int(a4_width_mm / character_width_mm)
    fontsize_mm = fontsize_pt * pt_to_mm

    pdf = FPDF(orientation='P', unit='mm', format='A4')
    pdf.set_auto_page_break(True, margin=margin_bottom_mm)
    pdf.add_page()

    for _, row in tqdm(fin_news.iterrows(), desc="Converting fin_news csv to pdf doc"):
        pdf.set_font(family='Courier', size=fontsize_pt)

        date = str(row["date"])[:10]
        news = f"Financial news for stock {row['stock']} dated on {date}: "
        news += unidecode(row['title'])

        wrapped = textwrap.wrap(news, width_text)
        for line in wrapped:
            pdf.cell(0, fontsize_mm, line, ln=1)
        pdf.cell(0, fontsize_mm, "", ln=1)  # newline

    pdf.output("./pdf_outputs/fin_data.pdf", "F")

def gen_news_to_pdf(gen_news):
    a4_width_mm = 210
    pt_to_mm = 0.35
    fontsize_pt = 10
    margin_bottom_mm = 10

    character_width_mm = 7 * pt_to_mm
    width_text = int(a4_width_mm / character_width_mm)
    fontsize_mm = fontsize_pt * pt_to_mm

    pdf = FPDF(orientation='P', unit='mm', format='A4')
    pdf.set_auto_page_break(True, margin=margin_bottom_mm)
    pdf.add_page()

    for _, row in tqdm(gen_news.iterrows(), desc="Converting gen_news csv to pdf doc"):
        pdf.set_font(family='Courier', size=fontsize_pt)

        date = str(row["pubDate"])[5:16]
        news = f"News dated on {date}: "
        news += unidecode(row['title']) + ". " + unidecode(row['description'])

        wrapped = textwrap.wrap(news, width_text)
        for line in wrapped:
            pdf.cell(0, fontsize_mm, line, ln=1)
        pdf.cell(0, fontsize_mm, "", ln=1)  # newline

    pdf.output("./pdf_outputs/gen_news.pdf", "F")


fin_news_to_pdf(fin_news)
gen_news_to_pdf(gen_news)

