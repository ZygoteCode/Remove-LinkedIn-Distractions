// ==UserScript==
// @name         LinkedIn Remove Distractions
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  Remove all the LinkedIn distractions to get concentrated on what's really important
// @author       ZygoteCode
// @match        https://www.linkedin.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=linkedin.com
// @updateURL    https://github.com/ZygoteCode/Remove-LinkedIn-Distractions/raw/main/LinkedInRemoveDistractions.user.js
// @downloadURL  https://github.com/ZygoteCode/Remove-LinkedIn-Distractions/raw/main/LinkedInRemoveDistractions.user.js
// @grant        none
// ==/UserScript==

(function()
{
    const distractingElements =
    [
        "main[class='scaffold-layout__main']",
        "div[class='scaffold-layout__sidebar']",
        "a[href='https://www.linkedin.com/notifications/?']",
        "a[href='https://www.linkedin.com/mynetwork/?doMynetworkRefresh=true']",
        "a[href='https://www.linkedin.com/mynetwork/?']",
        "div[class='premium-upsell-link']",
        "div[class='mb2']",
        "div[class='scaffold-layout__sticky-content']",
        "button[class='global-nav__app-launcher-trigger']"
    ];

    const distractingPaths = ["/html/body/div[6]/div[3]/div/div/div[2]/div/div/aside", "/html/body/div[5]/div[3]/div/div/div[2]/div/div/aside"];
    const head = document.head || document.getElementsByTagName('head')[0];
    const styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = ".msg-overlay-list-bubble,a[href='https://www.linkedin.com/notifications/?'],a[href='https://www.linkedin.com/mynetwork/?doMynetworkRefresh=true'],a[href='https://www.linkedin.com/mynetwork/?'],div[class='premium-upsell-link']{display:none!important;visibility:hidden!important;}";
    head.appendChild(styleElement);

    function getElementByXpath(path)
    {
        return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }

    function asyncLoop()
    {
        try
        {
            if (window.location.href.startsWith('https://www.linkedin.com/feed/') || window.location.href == 'https://www.linkedin.com/')
            {
                for (var i = 0; i < distractingElements.length; i++)
                {
                    var distractingElement = document.querySelector(distractingElements[i]);
    
                    if (distractingElement != null && distractingElement != undefined)
                    {
                        distractingElement.remove();
                    }
                }
            }

            for (var i = 0; i < distractingPaths.length; i++)
            {
                var sidebarElement = getElementByXpath(distractingPaths[i]);

                if (sidebarElement != null && sidebarElement != undefined)
                {
                    if (sidebarElement.innerHTML.includes("<div id=\"browsemap_recommendation\""))
                    {
                        sidebarElement.remove();
                    }
                }
            }
			
			var dashboardElement = document.querySelector("a[href='/dashboard/']");
			
			if (dashboardElement != null && dashboardElement != undefined)
			{
				if (dashboardElement.parentElement != null && dashboardElement.parentElement != undefined)
				{
					dashboardElement.parentElement.remove();
				}
			}
			
			var buttonElement = document.querySelector("path[d='M3 3h4v4H3zm7 4h4V3h-4zm7-4v4h4V3zM3 14h4v-4H3zm7 0h4v-4h-4zm7 0h4v-4h-4zM3 21h4v-4H3zm7 0h4v-4h-4zm7 0h4v-4h-4z']").parentElement.parentElement.parentElement.parentElement.parentElement;
			
			if (buttonElement != null && buttonElement != undefined)
			{
				buttonElement.remove();
			}
        }
        catch (e)
        {

        }

        setTimeout(async function()
        {
            await asyncLoop();
        },
        500);
    }

    asyncLoop();
})();
