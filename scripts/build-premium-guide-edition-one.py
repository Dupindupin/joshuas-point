from __future__ import annotations

import html
import io
import re
import shutil
import textwrap
import urllib.request
import zipfile
from pathlib import Path

from PIL import Image
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A5
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    Image as PdfImage,
    KeepTogether,
    ListFlowable,
    ListItem,
    NextPageTemplate,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
)

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"
OUTPUT = ROOT / "output"
PDF_OUTPUT = OUTPUT / "pdf"
EPUB_OUTPUT = OUTPUT / "epub"
WEB_DOWNLOADS = ROOT / "web" / "public" / "downloads"
TMP = ROOT / "tmp" / "pdfs" / "premium-guide-edition-one"

PDF_NAME = "southern-negros-from-joshuas-point-edition-1.pdf"
EPUB_NAME = "southern-negros-from-joshuas-point-edition-1.epub"
MANUSCRIPT_NAME = "southern-negros-from-joshuas-point-edition-1.md"

DEEP_OCEAN = colors.HexColor("#1F3D3A")
FOREST = colors.HexColor("#496B5B")
WARM_SAND = colors.HexColor("#C8A26A")
LINEN = colors.HexColor("#F3EDE6")
CHARCOAL = colors.HexColor("#282828")
MUTED = colors.HexColor("#6B6B65")

REMOTE_IMAGES = {
    "waterfall": "https://cdn.sanity.io/images/8m6fb3x7/production/acfcca9ab755301ba8e33458832cc7fecc4d8c53-960x1278.jpg",
    "apo": "https://cdn.sanity.io/images/8m6fb3x7/production/80fd7a3e2328b24b570c4c27ccb071789e5d5df2-1200x800.webp",
    "lake": "https://cdn.sanity.io/images/8m6fb3x7/production/ae24064ea118566606d0d4a5142d86d584383eb5-960x720.webp",
    "dauin": "https://cdn.sanity.io/images/8m6fb3x7/production/361d8c19d0d83e665c688b7c5106044ecde0f984-1200x800.webp",
}

CHAPTER_SOURCES = [
    ("01", "From Joshua's Point", DOCS / "premium-guide-edition-1" / "01_FROM_JOSHUAS_POINT_DRAFT.md", None),
    ("02", "Arriving Through Dumaguete", DOCS / "premium-guide-edition-1" / "02_ARRIVING_THROUGH_DUMAGUETE_DRAFT.md", None),
    ("03", "Zamboanguita and the Coast Around Home", DOCS / "premium-guide-edition-1" / "03_ZAMBOANGUITA_AND_THE_COAST_AROUND_HOME_DRAFT.md", DOCS / "PREMIUM_GUIDE_JOURNEY_04_COAST_AROUND_HOME_COMPLETE_DRAFT.md"),
    ("04", "Dauin and the Marine Coast", None, DOCS / "PREMIUM_GUIDE_JOURNEY_05_DAUIN_MARINE_COAST_COMPLETE_DRAFT.md"),
    ("05", "Valencia and the Highlands", None, DOCS / "PREMIUM_GUIDE_JOURNEY_01_WATERFALL_EXPLORER_DRAFT.md"),
    ("06", "Siaton: Lake, Forest and Coast", None, DOCS / "PREMIUM_GUIDE_JOURNEY_03_MOUNTAIN_LAKE_EXPLORER_DRAFT.md"),
    ("07", "Apo Island", None, DOCS / "PREMIUM_GUIDE_JOURNEY_02_APO_ISLAND_EXPLORER_FINAL_DRAFT.md"),
]

ROADS_CHAPTER = """
## Why the road matters

Some days are remembered for the road itself: the coastline opening beside small communities, the cooler climb toward Valencia, rainforest around Twin Lakes, or the long southern return from Lake Balanan and Najandig Peak.

The Joshua's Point route system holds five owner-approved routes: Coastal Ride to Dumaguete, Valencia Highlands Loop, Waterfall Explorer, Twin Lakes Escape and Southern Explorer. Their verified geometry and ordered stops remain in the public route records rather than being copied into this book.

## Reading a route

Use each route as orientation, not as a promise that conditions will remain unchanged. Fuel, weather, access, daylight and road conditions still need to be checked before leaving. A route remains enjoyable when it is not treated as a target that must be completed.

## The Edition 1 route set

- Coastal Ride to Dumaguete - a paved coastal relationship through Dauin toward the city.
- Valencia Highlands Loop - a steady climb from the coast into cooler highland roads.
- Waterfall Explorer - the owner-approved connection between Valencia, Casaroro Falls and Pulangbato Falls.
- Twin Lakes Escape - a longer climb through Valencia toward rainforest and lake water.
- Southern Explorer - the longest route, continuing through Siaton toward Lake Balanan and Najandig Peak.

## Leave space to return

Travel within your experience. Begin with enough fuel, allow weather or road conditions to shorten the journey and leave daylight for the return. Turning around can be the right ending to the day.
"""

FIELD_NOTES_CHAPTER = """
## What to confirm before leaving

Confirm current access, weather, local rules, transport or operator arrangements and the return plan. Prices, schedules, services and conditions can change. The public Joshua's Point pages remain the place for corrections and current updates.

## Carry the useful details offline

Keep the confirmed Joshua's Point address, contact channel, meeting instructions and essential travel information available without a signal. Download the relevant journey and map before leaving.

## Fuel, food and water

Begin longer roads with enough fuel for the return. Carry drinking water and something small to eat when the journey leaves town. Markets, stores, cafés and restaurants are part of the region, but their current hours and payment methods should be confirmed rather than assumed.

## Responsible travel

Observe without interrupting work or entering private land. Ask before photographing people. Be respectful, curious and open-minded; a smile, patience and kindness often create the best conversations.

In the water, follow qualified local guidance. Never touch, move, feed, crowd or stage marine life for a photograph. The guide is not a dive plan, a medical assessment or a safety guarantee.

## Changing conditions

Weather, sea state, rain and road conditions can change a day. Leave room to choose a shorter journey, postpone a crossing or return early. The point is to experience Southern Negros well, not to complete the guide.
"""

OPENING = """
# Southern Negros from Joshua's Point

## Edition 1

Five journeys from Joshua's Point, shaped by Tobias's experience, verified place knowledge and enough practical guidance to carry the day offline.

## A note from Joshua's Point

This guide begins at the house, but it is really about what lies around it. The mountains, sea, islands, waterfalls, roads and coastal towns are part of the world Tobias knows and wants guests to discover without rushing.

Each journey keeps three things clear: what is known about the place, what Tobias remembers from real visits, and the way Joshua's Point recommends experiencing the day. Conditions and services change, so anything time-sensitive should be confirmed before leaving.

## How to use this guide

Choose one journey that suits the weather, energy and interests of the group. Read the preparation and practical notes before leaving. Use the maps for orientation rather than turn-by-turn navigation, and carry the relevant pages offline.

The guide does not replace qualified dive guidance, live weather, current access information, medical advice or local instructions.
"""

CLOSING = """
# A quiet return

Every journey in this edition returns to Joshua's Point. The road home, the evening air and the view from the deck belong to the day as much as the place visited.

A useful guide does not make the day louder. It gives you enough context to leave well, pay attention and find your way home.

## Edition notes

Edition 1. Practical information can change; confirm current access, weather, local guidance and arrangements before every journey.

Corrections: mail@joshuaspoint.com
"""


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def clean_chapter(text: str) -> str:
    text = re.split(r"\n## Internal production record\n", text, maxsplit=1)[0]
    text = re.sub(r"\n## Zamboanguita area map\n.*?(?=\n## |\Z)", "\n", text, flags=re.DOTALL)
    text = re.sub(r"^# .+\n+", "", text)
    text = re.sub(r"^\*\*[^\n]+\*\*.*\n", "", text, flags=re.MULTILINE)
    text = re.sub(r"^owner records\s*$", "", text, flags=re.MULTILINE | re.IGNORECASE)
    text = text.replace("public-safe precision", "general orientation")
    text = text.replace("owner-approved", "current")
    text = text.replace("canonical", "current public")
    return text.strip()


def clean_journey(text: str) -> str:
    match = re.search(r"^## (?:1\. (?:The Place|Journey introduction))\s*$", text, flags=re.MULTILINE | re.IGNORECASE)
    if match:
        text = text[match.start():]
    text = re.sub(r"\*Editorial layer:.*?\*\n", "", text, flags=re.DOTALL)
    disallowed = (
        "Map",
        "Map requirements",
        "Photography",
        "Photography requirements",
        "Free website versus Premium value boundary",
        "Draft review record",
    )
    kept: list[str] = []
    skipping = False
    for line in text.splitlines():
        heading = re.match(r"^##\s+(?:\d+\.\s*)?(.+?)\s*$", line)
        if heading:
            name = heading.group(1).strip()
            skipping = any(name.casefold() == item.casefold() for item in disallowed)
            if skipping:
                continue
        if not skipping:
            kept.append(line)
    text = "\n".join(kept)
    text = re.sub(r"\n### Deliberately not included\n.*?(?=\n###|\Z)", "\n", text, flags=re.DOTALL)
    text = re.sub(r"\n### Confirm before leaving\n", "\n### Confirm before leaving\n", text)
    return text.strip()


def build_manuscript() -> str:
    parts = [OPENING.strip(), "# Contents"]
    for number, title, _, _ in CHAPTER_SOURCES:
        parts.append(f"- Chapter {number}: {title}")
    parts.extend(["- Chapter 08: Roads Worth Taking", "- Chapter 09: Practical Field Notes"])

    for number, title, chapter_path, journey_path in CHAPTER_SOURCES:
        parts.append(f"# Chapter {number} - {title}")
        if chapter_path:
            parts.append(clean_chapter(read_text(chapter_path)))
        if journey_path:
            parts.append(f"## Edition 1 Journey")
            parts.append(clean_journey(read_text(journey_path)))

    parts.extend([
        "# Chapter 08 - Roads Worth Taking",
        ROADS_CHAPTER.strip(),
        "# Chapter 09 - Practical Field Notes",
        FIELD_NOTES_CHAPTER.strip(),
        CLOSING.strip(),
    ])
    return clean_public_manuscript("\n\n".join(parts).strip()) + "\n"


def clean_public_manuscript(text: str) -> str:
    replacements = {
        "Owner-confirmed guidance": "Practical guidance",
        "Existing guide guidance": "Place guidance",
        "owner-approved": "published",
        "Owner-approved": "Published",
        "current public route": "published route",
        "canonical scenic route": "published scenic route",
        "Canonical scenic route": "Published scenic route",
        "This draft": "This guide",
        "this draft": "this guide",
        "for the draft": "for the guide",
        "The final draft": "The guide",
        "final draft": "guide",
    }
    for old, new in replacements.items():
        text = text.replace(old, new)

    text = re.sub(r"\bdraft\b", "guide", text, flags=re.IGNORECASE)

    text = re.sub(
        r"\n### Information still requiring confirmation\n.*?(?=\n## |\n### |\Z)",
        "\n",
        text,
        flags=re.DOTALL | re.IGNORECASE,
    )

    editorial_only = re.compile(
        r"(?:"
        r"under owner review|"
        r"not yet approved|"
        r"the final edition|"
        r"the final guide|"
        r"the exact geography must be confirmed|"
        r"the guide must not|"
        r"this guide must not|"
        r"must come from verified sources|"
        r"must not be inferred|"
        r"requires an explicit owner decision|"
        r"to be linked only after|"
        r"only after .* confirmed|"
        r"only confirmed and useful relationships should appear|"
        r"must not fill those areas|"
        r"can be added without verified information"
        r")",
        flags=re.IGNORECASE | re.DOTALL,
    )
    paragraphs = re.split(r"\n\s*\n", text)
    text = "\n\n".join(paragraph for paragraph in paragraphs if not editorial_only.search(paragraph))

    blocked_phrases = (
        "pending Tobias",
        "pending a match",
        "pending confirmation",
        "recommendations remain pending",
        "must name the approved lake",
        "Remaining approval before production",
        "Remaining approval",
        "owner records",
    )
    clean_lines: list[str] = []
    for line in text.splitlines():
        if any(phrase.casefold() in line.casefold() for phrase in blocked_phrases):
            continue
        clean_lines.append(line)
    text = "\n".join(clean_lines)
    text = re.sub(r"\bThis\s+draft\b", "This guide", text, flags=re.IGNORECASE)
    text = text.replace(
        "Tobias has not named a specific restaurant for this guide, so the guide does not endorse one.",
        "No specific restaurant is endorsed; choose according to what is current on the day.",
    )
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text


def normalize_pdf_text(value: str) -> str:
    return (
        value.replace("\u2011", "-")
        .replace("\u2013", "-")
        .replace("\u2014", "-")
        .replace("\u2192", "to")
        .replace("Joshua’s", "Joshua's")
        .replace("Tobias’s", "Tobias's")
        .replace("Dauin’s", "Dauin's")
    )


def cache_remote_images() -> dict[str, Path]:
    TMP.mkdir(parents=True, exist_ok=True)
    paths: dict[str, Path] = {}
    for name, url in REMOTE_IMAGES.items():
        suffix = Path(url).suffix or ".jpg"
        target = TMP / f"{name}{suffix}"
        if not target.exists():
            urllib.request.urlretrieve(url, target)
        paths[name] = target
    return paths


def crop_image(path: Path, width: float, height: float) -> io.BytesIO:
    with Image.open(path) as image:
        image = image.convert("RGB")
        target_ratio = width / height
        source_ratio = image.width / image.height
        if source_ratio > target_ratio:
            new_width = int(image.height * target_ratio)
            left = (image.width - new_width) // 2
            image = image.crop((left, 0, left + new_width, image.height))
        else:
            new_height = int(image.width / target_ratio)
            top = (image.height - new_height) // 2
            image = image.crop((0, top, image.width, top + new_height))
        buffer = io.BytesIO()
        image.save(buffer, format="JPEG", quality=90, optimize=True)
        buffer.seek(0)
        return buffer


def register_fonts() -> None:
    regular = Path("/System/Library/Fonts/Supplemental/Georgia.ttf")
    bold = Path("/System/Library/Fonts/Supplemental/Georgia Bold.ttf")
    italic = Path("/System/Library/Fonts/Supplemental/Georgia Italic.ttf")
    if regular.exists():
        pdfmetrics.registerFont(TTFont("JPDisplay", str(regular)))
        pdfmetrics.registerFont(TTFont("JPDisplay-Bold", str(bold)))
        pdfmetrics.registerFont(TTFont("JPDisplay-Italic", str(italic)))


class GuideDocTemplate(BaseDocTemplate):
    def __init__(self, filename: str):
        super().__init__(filename, pagesize=A5, leftMargin=18 * mm, rightMargin=17 * mm,
                         topMargin=18 * mm, bottomMargin=18 * mm,
                         title="Southern Negros from Joshua's Point",
                         author="Joshua's Point",
                         subject="Edition 1 field guide to Southern Negros Oriental")
        frame = Frame(self.leftMargin, self.bottomMargin, self.width, self.height, id="main")
        cover_frame = Frame(0, 0, A5[0], A5[1], leftPadding=0, rightPadding=0,
                            topPadding=0, bottomPadding=0, id="cover")
        self.addPageTemplates([
            PageTemplate(id="cover", frames=[cover_frame]),
            PageTemplate(id="content", frames=[frame], onPage=self.draw_page),
            PageTemplate(id="chapter", frames=[frame], onPage=self.draw_chapter_page),
        ])

    def draw_page(self, canvas, doc):
        canvas.saveState()
        canvas.setStrokeColor(colors.HexColor("#D8D0C5"))
        canvas.line(18 * mm, 14 * mm, A5[0] - 17 * mm, 14 * mm)
        canvas.setFillColor(MUTED)
        canvas.setFont("Helvetica", 7)
        canvas.drawString(18 * mm, 9.5 * mm, "SOUTHERN NEGROS FROM JOSHUA'S POINT")
        canvas.drawRightString(A5[0] - 17 * mm, 9.5 * mm, str(doc.page))
        canvas.restoreState()

    def draw_chapter_page(self, canvas, doc):
        canvas.saveState()
        canvas.setFillColor(DEEP_OCEAN)
        canvas.rect(0, 0, A5[0], A5[1], fill=1, stroke=0)
        canvas.setFillColor(WARM_SAND)
        canvas.circle(A5[0] - 22 * mm, 22 * mm, 2.2 * mm, fill=1, stroke=0)
        canvas.restoreState()


def paragraph_styles():
    base = getSampleStyleSheet()
    return {
        "body": ParagraphStyle("Body", parent=base["BodyText"], fontName="Helvetica", fontSize=9.2,
                               leading=14.2, textColor=CHARCOAL, spaceAfter=4 * mm),
        "h1": ParagraphStyle("H1", fontName="JPDisplay", fontSize=27, leading=30, textColor=DEEP_OCEAN,
                             spaceBefore=5 * mm, spaceAfter=9 * mm),
        "h2": ParagraphStyle("H2", fontName="JPDisplay", fontSize=18, leading=22, textColor=FOREST,
                             spaceBefore=8 * mm, spaceAfter=4 * mm),
        "h3": ParagraphStyle("H3", fontName="Helvetica-Bold", fontSize=9.5, leading=13,
                             textColor=DEEP_OCEAN, spaceBefore=4 * mm, spaceAfter=2.5 * mm),
        "chapter": ParagraphStyle("Chapter", fontName="JPDisplay", fontSize=31, leading=34,
                                  textColor=LINEN, alignment=TA_LEFT, spaceBefore=65 * mm),
        "chapter_number": ParagraphStyle("ChapterNumber", fontName="Helvetica-Bold", fontSize=8,
                                         leading=10, textColor=WARM_SAND, tracking=2, spaceBefore=16 * mm),
        "cover": ParagraphStyle("Cover", fontName="JPDisplay", fontSize=32, leading=34,
                                textColor=colors.white, alignment=TA_LEFT),
        "cover_small": ParagraphStyle("CoverSmall", fontName="Helvetica-Bold", fontSize=7.5,
                                      leading=11, textColor=LINEN, tracking=1.8),
        "caption": ParagraphStyle("Caption", fontName="Helvetica", fontSize=7.5, leading=10.5,
                                  textColor=MUTED, spaceAfter=4 * mm),
        "toc": ParagraphStyle("Toc", fontName="JPDisplay", fontSize=14, leading=18,
                              textColor=CHARCOAL, leftIndent=8 * mm, firstLineIndent=-8 * mm,
                              spaceAfter=3 * mm),
    }


def add_cover(story, styles, cover_path: Path):
    cover = crop_image(cover_path, A5[0], A5[1])
    image = PdfImage(cover, width=A5[0], height=A5[1])
    image.hAlign = "CENTER"
    story.append(image)
    story.append(NextPageTemplate("content"))
    story.append(PageBreak())
    story.append(Spacer(1, 23 * mm))
    story.append(Paragraph("SOUTHERN NEGROS ORIENTAL - EDITION 01", styles["cover_small"]))
    story.append(Spacer(1, 7 * mm))
    story.append(Paragraph("Southern Negros<br/>from Joshua's Point", styles["h1"]))
    story.append(Paragraph("Five journeys shaped by place knowledge, Tobias's experience and the road home.", styles["body"]))
    story.append(PageBreak())


def markdown_to_story(markdown: str, images: dict[str, Path]):
    styles = paragraph_styles()
    story = []
    cover_path = ROOT / "web" / "public" / "images" / "premium-guide" / "cover" / "southern-negros-cover-concept-v1.png"
    add_cover(story, styles, cover_path)

    lines = normalize_pdf_text(markdown).splitlines()
    bullet_buffer: list[str] = []
    paragraph_buffer: list[str] = []
    chapter_index = 0

    def flush_bullets():
        nonlocal bullet_buffer
        if bullet_buffer:
            items = [
                ListItem(
                    Paragraph(
                        re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", html.escape(item)),
                        styles["body"],
                    ),
                    leftIndent=0,
                )
                for item in bullet_buffer
            ]
            story.append(ListFlowable(items, bulletType="bullet", leftIndent=5 * mm, bulletColor=WARM_SAND))
            bullet_buffer = []

    def flush_paragraph():
        nonlocal paragraph_buffer
        if paragraph_buffer:
            joined = " ".join(paragraph_buffer)
            text = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", html.escape(joined))
            text = re.sub(r"\*(.+?)\*", r"<i>\1</i>", text)
            story.append(Paragraph(text, styles["body"]))
            paragraph_buffer = []

    for raw in lines:
        line = raw.strip()
        if not line:
            flush_paragraph()
            flush_bullets()
            continue
        if line.startswith("- "):
            flush_paragraph()
            bullet_buffer.append(line[2:])
            continue

        flush_bullets()
        if line.startswith("#") or line.startswith("|") or line.startswith("*Editorial") or line.startswith("**"):
            flush_paragraph()
        if line.startswith("# Chapter "):
            chapter_index += 1
            story.append(NextPageTemplate("chapter"))
            story.append(PageBreak())
            match = re.match(r"# Chapter (\d+) - (.+)", line)
            number = match.group(1) if match else f"{chapter_index:02d}"
            title = match.group(2) if match else line.removeprefix("# ")
            story.append(Paragraph(f"CHAPTER {number}", styles["chapter_number"]))
            story.append(Paragraph(html.escape(title), styles["chapter"]))
            story.append(NextPageTemplate("content"))
            story.append(PageBreak())
            image_name = {3: "lake", 4: "dauin", 5: "waterfall", 6: "lake", 7: "apo"}.get(chapter_index)
            if image_name and images.get(image_name):
                crop = crop_image(images[image_name], 112 * mm, 68 * mm)
                story.append(PdfImage(crop, width=112 * mm, height=68 * mm))
                story.append(Spacer(1, 4 * mm))
            continue
        if line.startswith("# Contents"):
            story.append(Paragraph("Contents", styles["h1"]))
            continue
        if line.startswith("# A quiet return"):
            story.append(NextPageTemplate("chapter"))
            story.append(PageBreak())
            story.append(Paragraph("CLOSING", styles["chapter_number"]))
            story.append(Paragraph("A quiet return", styles["chapter"]))
            story.append(NextPageTemplate("content"))
            story.append(PageBreak())
            continue
        if line.startswith("# "):
            title = line[2:]
            story.append(Paragraph(html.escape(title), styles["h1"]))
            continue
        if line.startswith("## "):
            title = re.sub(r"^\d+\.\s*", "", line[3:])
            story.append(Paragraph(html.escape(title), styles["h2"]))
            continue
        if line.startswith("### "):
            story.append(Paragraph(html.escape(line[4:]), styles["h3"]))
            continue
        if line.startswith("|") or line.startswith("*Editorial") or line.startswith("**"):
            continue
        paragraph_buffer.append(line)

    flush_paragraph()
    flush_bullets()
    return story


def create_pdf(markdown: str, images: dict[str, Path], target: Path) -> None:
    register_fonts()
    target.parent.mkdir(parents=True, exist_ok=True)
    doc = GuideDocTemplate(str(target))
    story = markdown_to_story(markdown, images)
    doc.build(story)


def markdown_to_xhtml(markdown: str, title: str) -> str:
    body: list[str] = []
    in_list = False
    paragraph_buffer: list[str] = []

    def flush_paragraph():
        nonlocal paragraph_buffer
        if paragraph_buffer:
            body.append(f"<p>{html.escape(' '.join(paragraph_buffer))}</p>")
            paragraph_buffer = []

    for raw in normalize_pdf_text(markdown).splitlines():
        line = raw.strip()
        if line.startswith("- "):
            flush_paragraph()
            if not in_list:
                body.append("<ul>")
                in_list = True
            body.append(f"<li>{html.escape(line[2:])}</li>")
            continue
        if in_list:
            body.append("</ul>")
            in_list = False
        if not line:
            flush_paragraph()
            continue
        if line.startswith("### "):
            flush_paragraph()
            body.append(f"<h3>{html.escape(line[4:])}</h3>")
        elif line.startswith("## "):
            flush_paragraph()
            body.append(f"<h2>{html.escape(line[3:])}</h2>")
        elif line.startswith("# "):
            flush_paragraph()
            body.append(f"<h1>{html.escape(line[2:])}</h1>")
        elif line.startswith("|") or line.startswith("*Editorial") or line.startswith("**"):
            continue
        else:
            paragraph_buffer.append(line)
    flush_paragraph()
    if in_list:
        body.append("</ul>")
    return f'''<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head><title>{html.escape(title)}</title><link rel="stylesheet" href="styles.css" type="text/css"/></head>
<body>{''.join(body)}</body></html>'''


def create_epub(markdown: str, target: Path, cover_path: Path) -> None:
    target.parent.mkdir(parents=True, exist_ok=True)
    chapters = re.split(r"(?=^# Chapter \d+ - )", markdown, flags=re.MULTILINE)
    chapter_files = []
    for index, chapter in enumerate(chapters):
        name = f"chapter-{index:02d}.xhtml"
        chapter_files.append((name, markdown_to_xhtml(chapter, f"Section {index}")))

    nav_items = "".join(
        f'<li><a href="{name}">Section {index + 1}</a></li>'
        for index, (name, _) in enumerate(chapter_files)
    )
    manifest_items = "".join(
        f'<item id="c{index}" href="{name}" media-type="application/xhtml+xml"/>'
        for index, (name, _) in enumerate(chapter_files)
    )
    spine_items = "".join(f'<itemref idref="c{index}"/>' for index in range(len(chapter_files)))

    container = '''<?xml version="1.0"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
<rootfiles><rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/></rootfiles>
</container>'''
    package = f'''<?xml version="1.0" encoding="utf-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="bookid">
<metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
<dc:identifier id="bookid">joshuas-point-southern-negros-edition-1</dc:identifier>
<dc:title>Southern Negros from Joshua's Point</dc:title><dc:creator>Tobias Steger</dc:creator>
<dc:language>en</dc:language><meta property="dcterms:modified">2026-08-12T00:00:00Z</meta>
</metadata>
<manifest><item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>
<item id="css" href="styles.css" media-type="text/css"/>{manifest_items}</manifest>
<spine>{spine_items}</spine></package>'''
    nav = f'''<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
<head><title>Contents</title></head><body><nav epub:type="toc"><h1>Contents</h1><ol>{nav_items}</ol></nav></body></html>'''
    css = '''body{font-family:system-ui,sans-serif;line-height:1.65;color:#282828;margin:6%;}h1,h2{font-family:Georgia,serif;color:#1F3D3A;}h1{font-size:2.2em;margin-top:1.8em;}h2{font-size:1.45em;margin-top:1.7em;}h3{font-size:1em;text-transform:uppercase;letter-spacing:.08em;color:#496B5B;}p{max-width:42em;}li{margin:.5em 0;}'''

    with zipfile.ZipFile(target, "w") as archive:
        archive.writestr("mimetype", "application/epub+zip", compress_type=zipfile.ZIP_STORED)
        archive.writestr("META-INF/container.xml", container)
        archive.writestr("OEBPS/content.opf", package)
        archive.writestr("OEBPS/nav.xhtml", nav)
        archive.writestr("OEBPS/styles.css", css)
        for name, content in chapter_files:
            archive.writestr(f"OEBPS/{name}", content)


def main() -> None:
    PDF_OUTPUT.mkdir(parents=True, exist_ok=True)
    EPUB_OUTPUT.mkdir(parents=True, exist_ok=True)
    WEB_DOWNLOADS.mkdir(parents=True, exist_ok=True)
    OUTPUT.mkdir(parents=True, exist_ok=True)

    manuscript = build_manuscript()
    manuscript_path = OUTPUT / MANUSCRIPT_NAME
    manuscript_path.write_text(manuscript, encoding="utf-8")

    images = cache_remote_images()
    pdf_path = PDF_OUTPUT / PDF_NAME
    epub_path = EPUB_OUTPUT / EPUB_NAME
    create_pdf(manuscript, images, pdf_path)
    create_epub(
        manuscript,
        epub_path,
        ROOT / "web" / "public" / "images" / "premium-guide" / "cover" / "southern-negros-cover-concept-v1.png",
    )

    shutil.copy2(pdf_path, WEB_DOWNLOADS / PDF_NAME)
    shutil.copy2(epub_path, WEB_DOWNLOADS / EPUB_NAME)
    print(pdf_path)
    print(epub_path)
    print(manuscript_path)


if __name__ == "__main__":
    main()
