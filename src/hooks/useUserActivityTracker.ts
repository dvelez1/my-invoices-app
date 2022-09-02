import { useEffect } from "react";

export const useUserActivityTracker = () => {
  //   const [isTracking, setIsTracking] = useEffect(false);

  useEffect(() => {

    document.addEventListener("mousemove", () => {
      localStorage.lastActivity = new Date();
    });
    
    document.addEventListener("click", () => {
      localStorage.lastActivity = new Date();
    });

    let timeInterval = setInterval(() => {
      let lastAcivity = localStorage.getItem("lastActvity");
      if (lastAcivity) {
        var diffMs = Math.abs(
          new Date(Date.parse(lastAcivity)).getTime() - new Date().getTime()
        ); // milliseconds between now & last activity

        var seconds = Math.floor(diffMs / 1000);
        var minute = Math.floor(seconds / 60);
        console.log(
          seconds + " sec and " + minute + " min since last activity"
        );
        if (minute == 10) {
          console.log("No activity from last 10 minutes... Logging Out");
          clearInterval(timeInterval);
          //code for logout or anything...
        }
      }
    }, 1000);
  }, []);

};
