import {Request, Response, Router} from "express";
import multer from "multer";
import csvParser from "csv-parser"
import fs from "fs"
const multerConfig = multer({
    dest: 'uploads/',
})
const router = Router();

interface CsvData {
    [key: string]: any;
}

const csvData: CsvData[] = [];

router.post('/api/files', multerConfig.single('file'), async (req: Request, res: Response) => {
    const data: CsvData[] = [];
    const filePath = req.file?.path;

    if (!filePath) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (row) => {
            data.push(row);
        })
        .on('end', () => {
            csvData.push(...data);
            fs.unlinkSync(filePath);
            res.status(201).json({ message: 'CSV data uploaded and stored' });
        });
});

router.get('/api/users', (req: Request, res: Response) => {
    const searchTerm = req.query.q as string;

    if (!searchTerm) {
        return res.status(400).json({ error: 'Missing search term' });
    }

    const results = searchData(searchTerm);
    if (results.length === 0) {
        return res.status(404).json({ message: 'No matching users found' });
    }
    res.status(200).json(results);
});

function searchData(searchTerm: string): CsvData[] {
    const searchTermLower = searchTerm.toLowerCase();
    return csvData.filter((row) => {
        for (const key in row) {
            if (row.hasOwnProperty(key) && row[key].toLowerCase().includes(searchTermLower)) {
                return true;
            }
        }
        return false;
    });
}

export {router};


