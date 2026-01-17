import type { BookId, Genre, LoanStatus } from "./types";

type BookConstructorOptions = {
  id: BookId;
  title: string;
  author: string;
  year: number;
  genre: Genre;
};

export class Book {
  id: BookId;
  title: string;
  author: string;
  year: number;
  genre: Genre;

  private status: LoanStatus = "available";
  private borrowedBy: string | null = null;

  constructor(opts: BookConstructorOptions) {
    this.id = opts.id;
    this.title = opts.title;
    this.author = opts.author;
    this.year = opts.year;
    this.genre = opts.genre;
  }

  getStatus(): LoanStatus {
    return this.status;
  }

  markBorrowed(personName: string): void {
    if (this.status === "borrowed") {
      throw new Error(`Already borrowed by ${this.borrowedBy}`);
    }

    this.status = "borrowed";
    this.borrowedBy = personName;
  }

  markReturned(): void {
    if (this.status === "available") {
      throw new Error("Already available");
    }

    this.status = "available";
    this.borrowedBy = null;
  }

  getInfo(): string {
    const main = `${this.title} — ${this.author} (${this.year}), ${this.genre}`;
    if (this.status === "available") {
      return `${main} [Available]`;
    }

    return `${main} [Borrowed by ${this.borrowedBy}]`;
  }
}
