import { readFile, writeFile, writeFileSync, existsSync } from 'fs';
import path from 'path';

export class FileHandler {
  constructor(filePath, data = []) {
    this.filePath = path.join(filePath);

    if (!existsSync(this.filePath)) writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf8');
  }

  async saveData(data) {
    return new Promise((resolve, reject) => {
      writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf8', (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async updateData(newData) {
    let data = await this.getData();
    data = { ...data, ...newData };
    await this.saveData(data);
  }

  async getData() {
    const checkData = await new Promise((resolve) => {
      resolve(existsSync(this.filePath));
    });

    if (!checkData) {
      return {};
    }

    const data = await new Promise((resolve, reject) => {
      readFile(this.filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
    return JSON.parse(data);
  }
}
