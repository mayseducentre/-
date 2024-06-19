import Breadcrumb from "./breadcrumb";
import Footer from "./footer";
import Header from "./header";

export default function InsGuide(){
    return(
        <>
        <Header />
        <Breadcrumb title="Installation Guide" />
        <div>
            
        <h2>How to install MEC App</h2>
            <ul>
                <li>Open <a href="https://mayseducentre.github.io/-/">https://mayseducentre.github.io/-/</a> on any browser. If you are already on the MEC website then don't bother to open the link.</li>
                <li>On the top right corner of the browser you will see an icon <i className="fa fa-ellipsis-v"></i>. Click on that icon.</li>
                <li>A modal box will display the controls of the browser. For example, when you open MEC webpage on chrome, click the <i className="fa fa-ellipsis-v"></i> icon at the top right of the page, a modal box displaying "new tab","new window", "new incognito window" .etc. will show.</li>
                <li>On the modal box, scroll down to find "Install App" or "Install MEC app" in the list.</li>
                <li>Click on "Install app" or "Install MEC app". This will take some moment to install the app on your device.</li>
            </ul>
        </div>

        <p>Some browsers may not allow you to install the app. This mostly occurs when the browser is outdated.</p>
        <p>Try updating the browser if you face challenges of installing the app. Or click on save and share in the modalbox, a dropdown will appear to install mec app.</p><p>You can <a href="#/contact">Contact</a> us for help.</p>

        <Footer />
        </>
    )
}