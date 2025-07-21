# salesforce-pdf-extractor-lwc
Salesforce LWC project to upload PDFs, extract data using pdf.co API, and create custom records.
# Salesforce PDF Data Extractor (Display Only)

This Salesforce project demonstrates how to upload a PDF file through a Lightning Web Component (LWC), send it to the [pdf.co API](https://app.pdf.co/) to extract specific parts of the PDF, and display the extracted data directly in the component.

> **Note:** This version does **not** create Salesforce records. It only displays the extracted content on the screen.

---

## Features

- Upload PDF files via Lightning Web Component.
- Send PDF to pdf.co API for extraction of specific data.
- Display extracted text/data in the LWC UI.
- Easily extendable to create Salesforce records based on extracted data (planned for future).

---

## How It Works

1. User selects and uploads a PDF file using the Lightning Web Component.
2. The component sends the PDF file to an Apex controller.
3. Apex calls the pdf.co API, requesting extraction of specified data from the PDF.
4. The API responds with the extracted data.
5. Apex sends the extracted data back to the LWC.
6. The LWC displays the extracted data to the user.

---

## Setup Instructions

1. **Clone this repository:**

   ```bash
   git clone https://github.com/yourusername/salesforce-pdf-extractor-lwc.git
