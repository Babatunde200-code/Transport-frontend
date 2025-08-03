export async function authFetch(url, options = {}) {
    let access = localStorage.getItem("access");
    const refresh = localStorage.getItem("refresh");
  
    // Clone the options object to avoid mutating it
    let opts = { ...options };
  
    // Make sure headers exist
    opts.headers = {
      ...opts.headers,
      "Content-Type": "application/json",
      "Authorization": "Bearer " + access,
    };
  
    // Attempt the request
    let response = await fetch(url, opts);
  
    // If unauthorized (token expired)
    if (response.status === 401 && refresh) {
      console.log("Access token expired, trying to refresh...");
      // Try refreshing the token
      const refreshResponse = await fetch(
        "https://transport-2-0imo.onrender.com/token/refresh/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh: refresh }),
        }
      );
  
      if (refreshResponse.ok) {
        const refreshData = await refreshResponse.json();
        // Update the stored access token
        localStorage.setItem("access", refreshData.access);
        access = refreshData.access;
  
        // Retry the original request with the new token
        opts.headers["Authorization"] = "Bearer " + access;
        response = await fetch(url, opts);
      } else {
        console.log("Refresh token expired or invalid. Logging out.");
        // Clear tokens and force logout
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");
        window.location.href = "/login";
        throw new Error("Session expired. Please log in again.");
      }
    }
  
    return response;
  }
  