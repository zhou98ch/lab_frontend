//npm install bibtex
import {parseBibFile, normalizeFieldValue} from "bibtex";

const bibFile = parseBibFile(`
          @InProceedings{realscience,
            author    = {Mary,Jerry},
            title     = {Information System},
            booktitle = {Book of Qeq},
            month     = {September},
            year      = {2001},
            address   = {Dordrecht},
            publisher = {Willems Uitgeverij},
            url       = {https://github.com/digitalheir/},
            pages     = {6--9}
          }
`);
const entry = bibFile
  .getEntry("realscience") // Keys are case-insensitive
const fieldValue = entry
  .getField("TITLE"); // This is a complex BibTeX string
console.log(fieldValue)