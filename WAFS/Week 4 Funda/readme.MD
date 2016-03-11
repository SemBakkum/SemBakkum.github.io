<h1> Readme of the branch </h1>

<h2>Images</h2> 

<article> 
  <p>
    The icons, logo and images all disappear when using a image blocker. 
    My solution for this is displaying the icons and the logo as an inline svg
    and giving them good alt attributes. For the images of the houses is it needed to give 
    them a good alt attribute when they come from the server. 
  </p>
</article>

<h2> Custom webfonts </h2> 

<article> 
  <p> 
    Because my web app doesn't make use of any custom webfonts there was no problem disabling them. 
    Instead I already made good use of fallback fonts in case the primirary font isn't available. 
  </p>
</article> 

<h2> Color </h2> 

<article> 
  <p> 
    To check if the readability of the web app was still okay I used the app sim Daltonism. 
    There was a change in contrast, but besides that the visibility was still okay and everything was good to read. 
  </p>
</article> 

<h2>Broadband internet</h2>

<article> 
  <p>
    When the web app is on the home page the download capacity isn't that much, but when you go to the results page 
    the web app downloads 3.5MB of photos. The solution to reduce the amount of downloaded MB's is to optimize the 
    photos on the server side so the size will be a smaller amount. 
  </p>
</article>

<h2>Mouse/Trackpad</h2> 

<article> 
  <p>
    At first I didn't had any problems with the tab navigation, but when I looked closer I found out that 
    the tab skipped some important things on the web app. The solution that I used was 'tabindex'. After 
    featuring this in the web app the tab navigation worked better than before and I'm quite happy with the end result. 
  </p>
</article> 

<h2>Javascript turned off</h2> 

<article> 
  <p>
    The complete web app is build in Javascript. So when I turned this off only the HTML and the CSS where visable. 
    The solution what I think could make this work when Javascript is disabled is to render the complete web app on the server side 
    so it can push back the content of the web app. For now I used the <noScript> tag the give the message that Javascript is a must to      run this web app properly.
  </p>
</article> 

<h2>Screenreader</h2> 

<article> 
  <p>
    After refactoring the tab navigation and using alt attributes the screen reader work alsmost perfectly thanks to
    also using the tabindex. 
  </p>
</article>
