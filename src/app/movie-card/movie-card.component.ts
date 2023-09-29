import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DirectorComponent } from '../director/director.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
    movies: any[] = [];
    constructor(
        public fetchApiData: FetchApiDataService,  
        private router: Router,
        public dialog: MatDialog,) { }
  
  ngOnInit(): void {
    this.getMovies();
  }

  goToProfile(): void {
    this.router.navigate(["profile"]);
}

logout(): void {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    this.router.navigate(["welcome"]);
}
  
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        console.log(this.movies);
        return this.movies;
      });
    }



openDirector(director: any): void {
    this.dialog.open(DirectorComponent, {
        maxWidth: "600px",
        data: director
    })
}
}