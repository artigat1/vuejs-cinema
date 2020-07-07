import { createApp } from "vue";

import genres from "@/util/genres";

import "@/assets/style.scss";

createApp({
  methods: {
    checkFilter(checked, title) {
      if (checked) {
        this.genres.push(title);
      } else {
        this.genres = this.genres.filter(genre => genre !== title);
      }
    }
  },
  data: () => ({
    genres: []
  }),
  components: {
    "movie-list": {
      props: {
        genres: Array
      },
      template: `
          <div id="movie-list">
              <div v-for="movie in filteredMovies">{{ movie.title }}</div>
          </div>
      `,
      data: () => ({
        movies: [
          {
            title: "Pulp Fiction",
            Genre: "Crime, Comedy"
          },
          {
            title: "Home Alone",
            Genre: "Comedy"
          },
          {
            title: "Austin Powers",
            Genre: "Comedy"
          },
          {
            title: "Spirited Away",
            Genre: "Animation"
          }
        ]
      }),
      computed: {
        filteredMovies() {
          return this.movies.filter(movie => {
            if (!this.genres.length) {
              return true;
            } else {
              const movieGenres = movie.Genre.split(", ");
              return movieGenres.some(genre => this.genres.includes(genre));
            }
          });
        }
      }
    },
    "movie-filter": {
      emits: ["check-filter"],
      template: `
          <div id="movie-filter">
              <h2>Filter results</h2>
              <div class="filter-group">
                  <check-filter v-for="genre in genres"
                                v-bind:title="genre"
                                v-on:check-filter="checkFilter"></check-filter>
              </div>
          </div>
      `,
      data: () => ({
        genres
      }),
      methods: {
        checkFilter(checked, title) {
          this.$emit("check-filter", checked, title);
        }
      },
      components: {
        "check-filter": {
          props: {
            title: String
          },
          emits: ["check-filter"],
          data: () => ({
            checked: false
          }),
          methods: {
            checkFilter() {
              this.checked = !this.checked;
              this.$emit("check-filter", this.checked, this.title);
            }
          },
          // eslint-disable-next-line
          template: `
              <div v-on:click="checkFilter"
                   v-bind:class="{ 'check-filter': true, active: checked }"
              >
                  <span class="checkbox"></span>
                  <span class="check-filter-title">{{ title }}</span>
              </div>
          `
        }
      }
    }
  }
}).mount("#app");
