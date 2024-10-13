package com.jasperSpring.springjasper.service;

import com.itextpdf.html2pdf.ConverterProperties;
import com.itextpdf.html2pdf.HtmlConverter;
import com.itextpdf.html2pdf.resolver.font.DefaultFontProvider;


import com.itextpdf.kernel.pdf.PdfWriter;
import org.springframework.stereotype.Service;


import java.io.*;
import java.time.LocalDateTime;


@Service
public class PdfGenerator {
    public String htmlToPdf(String processedHtml, String customer) {

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();

        try {

            PdfWriter pdfwriter = new PdfWriter(byteArrayOutputStream);

            DefaultFontProvider defaultFont = new DefaultFontProvider(false, true, false);

            ConverterProperties converterProperties = new ConverterProperties();

            converterProperties.setFontProvider(defaultFont);

            HtmlConverter.convertToPdf(processedHtml, pdfwriter, converterProperties);
            String home = System.getProperty("user.home");

            String fileName = customer+ LocalDateTime.now().toString().substring(0,10)+".pdf";
            File f = new File(new File(home, "Downloads"),fileName);

            System.out.println("----------------------------"+f);

            FileOutputStream fout = new FileOutputStream(f);

            byteArrayOutputStream.writeTo(fout);
            byteArrayOutputStream.close();

            byteArrayOutputStream.flush();
            fout.close();

            return null;

        } catch(Exception ex) {

            //exception occured
        }

        return null;
    }
}
