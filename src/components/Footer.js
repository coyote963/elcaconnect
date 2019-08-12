import React from 'react'
import logo from '../assets/adlalogo.png'
function Footer () {
    return (
        <div id="footer" class="row">
            <div class="col-12 col-md">
                <img class="mb-2" src={logo} alt="logo"  height="150" width="300"/>
                <small class="d-block mb-3 text-muted"> © 2019 John Clay</small>
            </div>
            <div class="col-6 col-md">
                <ul class="list-unstyled text-small">
                <li><a class="text-muted" href="https://github.com/coyote963/elcaconnect"> Github Page (front-end)</a></li>
                <li><a class="text-muted" href="/register/">Register an Account</a></li>
                <li><a class="text-muted" href="https://www.adlaelca.org/">ADLA Website</a></li>
                </ul>
            </div>
            <div class="col-6 col-md">
                <ul class="list-unstyled text-small">
                <li><a class="text-muted" href="https://www.elca.org/">ELCA Website</a></li>
                <li><a class="text-muted" href="http://api.elcaconnect.com/">API Reference</a></li>
                <li><a class="text-muted" href="https://scripture.api.bible/">Bible Sources</a></li>
                </ul>
            </div>
            <div class="col-6 col-md">
                <ul class="list-unstyled text-small">
                <li><a class="text-muted" href="mailto:coyoteandbird@gmail.com">Send Feedback</a></li>
                <li><a class="text-muted" href="http://www.bman.gg/">BMAN.GG</a></li>
                <li><a class="text-muted" href="https://github.com/coyote963/elcabackend">Github Page (back-end)</a></li>
                </ul>
            </div>
        </div>
    )
}
export default Footer;