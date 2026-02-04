export function getMatchStatus(start: Date, end: Date, now = new Date()){
      if(start > now){
         return "scheduled"
      }
      if(start <= now && now <= end){
          return "live";
      }

      return "finished";
}