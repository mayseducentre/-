import Breadcrumb from "./breadcrumb";
import Footer from "./footer";
import Header from "./header";

export default function InsGuide(){
    return(
        <>
        <Header />
        <Breadcrumb title="Installation Guide" />
        <div>
            <h4>Installing MEC app on different devices.</h4>
            <h6>Android (Chrome and other browsers)</h6>
            
            <p>1.<b>Automatic Install Prompt</b><br/>
            When you visit the MEC webapp on chrome(or most modern browsers like Firefox, Edge), you should automatically see an "Add to Home Screen" prompt, or you can manually install it by going to the browser's menu (three dots<i className="fa fa-ellipsis-v"></i> in chrome) and selecting "Install app" or "Add to Home Screen".
            </p>

            <p>2.<b>Steps</b><br/>
            <ul>
            <li>Visit mayseducentre.github.io/-/ in chrome</li>
            <li>Tap the three dots (menu) in the upper right corner.</li>
            <li>Select "Add to Home Screen"</li>
            </ul>
            </p>

            <h6>IOS (Safari)</h6>
            <p>1.<b>Manual Installation</b><br/>
            IOS doesn't support the automatic install prompt like Android, but users can install MEC webapp manually through safari.
            </p>

            <p>2.<b>Steps:</b>
            <ul>
            <li>Open mayseducentre.github.io/-/ in Safari</li>
            <li>Tap the <b>Share</b> button (square with an arrow pointing up).</li>
            <li>Scroll down and select "Add to Home Screen"</li>
            <li>Follow the prompts to add the app to the home screen</li>
            </ul></p>
        

            
            <h6>Desktop (Chrome, Edge, Firefox)</h6>
            <p>1.<b>Install on Desktop</b><br/>
          When users visit mayseducentre.github.io/-/ on a desktop browser (like chrome or Edge), they may see an install button in the address bar (or a browser menu option).
            </p>

            <p>2.<b>Steps (Chrome/Edge)</b>
            <ul>
            <li>Open mayseducentre.github.io/-/ in the browser</li>
            <li>Look for the <b>"Install"</b> button in the address bar or in the browser menu.</li>
            <li>Click on<b>Install</b> to add the app to the desktop</li>
            </ul></p>
            
            <p>3.<b>For other browsers</b>
            Firefox and other modern browsers offer a similar installation option, though it might be labeled differently (like "Save to desktop")
            </p>
            </div>
        <Footer />
        </>
    )
}