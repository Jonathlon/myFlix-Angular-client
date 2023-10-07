import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
    movies: any[] = [];
    userFavouriteMovies: any[] = [];
    constructor(
        public fetchApiData: FetchApiDataService,  
        private router: Router,
        public dialog: MatDialog,
        private snackBar: MatSnackBar,
        ) { }
  
  ngOnInit(): void {
    this.getMovies();
    this.getUserFavorites();
    if (!localStorage.getItem('token')){
        this.router.navigate(["welcome"]);
      }
  }

/**
 * Navigate to profile
 */

  goToProfile(): void {
    this.router.navigate(["profile"]);
}

/**
 * Logout user, clear localstorage and return user to welcome page
 */


logout(): void {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    this.router.navigate(["welcome"]);
}

/**
 * Get all movies from API
 * @returns movies
 */

  
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        console.log(this.movies);
        return this.movies;
      });
    }

/**
 * Open genre dialogue
 * @param genre 
 */

    openGenre(genre: any): void {
        this.dialog.open(GenreComponent, {
            maxWidth: "600px",
            data: genre
        })
    }

/**
 * Open director dialogue
 * @param director 
 */

    openDirector(director: any): void {
        this.dialog.open(DirectorComponent, {
            maxWidth: "600px",
            data: director
    })
}

/**
 * Open movie details dialouge
 * @param movie 
 */

    openMovie(movie: any): void {
        this.dialog.open(MovieDetailsComponent, {
            maxWidth: "600px",
            data: movie
    })
}

/**
 * Get users favorite movies
 * @returns userFavouriteMovies
 */

    getUserFavorites(): void {
        this.fetchApiData.getFavouriteMovies().subscribe((resp: any) => {
            this.userFavouriteMovies = resp;
        
    })
}

/**
 * Add or remove movie from favorite list
 * @param id 
 */

    toggleFavourite(id: string): void {
        if (this.userFavouriteMovies.includes(id)) {
            // Remove from favorites
            this.fetchApiData.deleteFavouriteMovie(id).subscribe((resp: any) => {
                this.snackBar.open("Successfully removed movie from favorites", 'OK', {
                    duration: 4000
            });
            this.getUserFavorites();
        });
    } else {
        // Add to favorites
        this.fetchApiData.addFavouriteMovie(id).subscribe((resp: any) => {
            this.snackBar.open("Successfully added movie to favorites", 'OK', {
                duration: 4000
            });
            this.getUserFavorites();
        });
    }
}









}


