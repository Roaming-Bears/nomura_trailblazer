import os
import pandas as pd
from fpdf import FPDF
from tqdm import tqdm

fin_news = pd.read_csv("./data/analyst_ratings_processed.csv", usecols=["title","date","stock"]) # Financial news
gen_news = pd.read_csv("./data/bbc_news.csv") # General news

def fin_news_to_pdf(fin_news):
    a4_width_mm = 210
    pt_to_mm = 0.35
    fontsize_pt = 10
    margin_bottom_mm = 10

    fontsize_mm = fontsize_pt * pt_to_mm
    #character_width_mm = 7 * pt_to_mm
    #width_text = int(a4_width_mm / character_width_mm)

    pdf = FPDF(orientation='P', unit='mm', format='A4')
    pdf.set_auto_page_break(True, margin=margin_bottom_mm)
    pdf.add_page()

    i = 0
    for _, row in fin_news.iterrows():
        pdf.set_font(family='Courier', size=fontsize_pt)

        news = f"Financial news for {row["stock"]} dated on {row['date']}: "
        news += row['title']

        pdf.cell(0, fontsize_mm, news, ln=1)
        pdf.cell(0, fontsize_mm, f"End of news for {row["stock"]} dated on {row['date']}", ln=1)
        pdf.cell(0, fontsize_mm, "", ln=1)  # newline

    pdf.output("./fin_data.pdf", "F")


fin_news_to_pdf(fin_news)




