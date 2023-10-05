import { Component, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
    user: any = {};
    @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };
    userFavouriteMovies: any[] = [];
    movies: any[] = [];

    constructor(
        public fetchApiData: FetchApiDataService,
        public snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.getUser();
    }

    getUser(): void {
        this.fetchApiData.getUser().subscribe((resp: any) => {
          this.user = resp;
          console.log(resp);
          return this.user;
        });
      }

   
    updateUser(): void {
        this.fetchApiData.editUser(this.userData).subscribe((resp: any) => {
            this.snackBar.open("Successfully changed userdata", 'OK', {
                duration: 4000
            });
            this.getUser();
        }, (result) => {
            this.snackBar.open(result, 'OK', {
                duration: 4000
            });
        });
    }

    getMovies(): void {
        this.fetchApiData.getAllMovies().subscribe((resp: any) => {
            this.movies = resp;
            console.log(this.movies);
            return this.movies;
          });
        }

    getUserFavorites(): void {
        this.fetchApiData.getFavouriteMovies().subscribe((resp: any) => {
            this.userFavouriteMovies = resp;
            this.getMovies = resp;
            console.log(this.userFavouriteMovies)
            
        })
    }
}