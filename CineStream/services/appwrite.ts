import { Client, Databases, Query } from "appwrite";
import { TMDB_CONFIG } from "./api";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = "metrics"; // your collection ID

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

interface Movie {
  title: string;
  poster_path?: string;
  id?:string
   vote_average: number;   
  release_date?: string; 
}


/* interface TrendingMovie {
  $id: string;             // Appwrite document ID
  $createdAt?: string;
  $updatedAt?: string;
  movie_id: any;
  searchTerm: string;
  count: number;
  title: string;
  poster_url?: string;
} */

export const updateSearchCount = async (searchTerm: string, movie: Movie) => {
  try {
    console.log("Searching for term:", searchTerm);

    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", searchTerm),
    ]);

    console.log("List documents result:", result);

    if (result.documents.length > 0) {
      const doc = result.documents[0];
      console.log("Document found, updating count:", doc);

      const updated = await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: doc.count + 1,
      });

      console.log("Updated document:", updated);
      return updated;
    } else {
      console.log("Document not found, creating new one");

      const created = await database.createDocument(DATABASE_ID, COLLECTION_ID, "unique()", {
        searchTerm,
        count: 1,
        title: movie.title,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });

      console.log("Created document:", created);
      return created;
    }
  } catch (err) {
    console.log("Error in updateSearchCount:", err);
    throw err;
  }
};


export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.orderDesc("count"),
      Query.limit(20),
    ]);

    return result.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
};


/* export const fetchMoviesDetails = async(movieId: string) : Promise<MovieDetails | null> => {
    try {
        const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,{
            method:"GET",
            headers: TMDB_CONFIG.headers,
        })

        if(!response.ok) throw new Error('Failed to Fetch movie details ')

            const data = await response.json()
            return data
    } catch (error) {
        console.log(error)
    }
} */

    export interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  runtime: number;
  revenue?:string;
  genres: Array<{ id: number; name: string }>;
  // Add other properties as needed
}

export const fetchMovieDetails = async (movieId: string): Promise<MovieDetails | null> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch movie details: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.log("Error fetching movie details:", error);
    return null; // ← This is the missing return statement
  }
};