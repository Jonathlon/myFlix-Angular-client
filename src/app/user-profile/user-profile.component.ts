import { Component, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
        public snackBar: MatSnackBar,
        public router: Router,
    ) { }

    ngOnInit(): void {
        this.getUser();
        this.getUserFavorites();
        if (!localStorage.getItem('token')){
            this.router.navigate(["welcome"]);
          }
    }

/**
 * Get user details from localStorage
 */

    getUser(): void {
        this.fetchApiData.getUser().subscribe((resp: any) => {
          this.user = resp;
          console.log(resp);
          return this.user;
        });
      }

/**
 * Update user details to API
*/

   
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

/**
 * Get user favourites from localStorage
 */

    getUserFavorites(): void {
        this.fetchApiData.getFavouriteMovies().subscribe((favMoviesIDs: any) => {
            this.fetchApiData.getAllMovies().subscribe((resp: any) => {
            this.movies = resp
            this.userFavouriteMovies = this.movies.filter(movie => favMoviesIDs.includes(movie._id))
            
            });
        })
    }

/**
 * Delete user from API and localstorage and route to welcome page
 */

    deleteAccount(): void {
        this.fetchApiData.deleteUser().subscribe((resp: any) => {
            this.snackBar.open("Successfully Deleted Account", 'OK', {
                duration: 4000
            });
            localStorage.clear()
            this.router.navigate(['welcome'])
        }, (result) => {
            this.snackBar.open(result, 'OK', {
                duration: 4000
            });
        });
        }
        
    }

