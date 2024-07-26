/**
 * Kijiji web scrapper
 * @description Scrapes the kijiji web site for listing information
 * @author Wallace Krumrei
 */
import IDOMParser from "advanced-html-parser";

/**
 * Scrape sections on the page for information
 * @param {String} page
 * @returns
 */
const web = (page) => {
  const doc = IDOMParser.parse(page);
  const listings = doc.querySelectorAll("section");

  // Empty results
  let results = [];

  // Listing
  const sections = listings.map((section, i) => {
    if (
      section.attributes &&
      section.attributes.length > 0 &&
      section.attributes[0].value === "listing-card"
    ) {
      // Result object
      let sectionData = {
        details: section.innerText(), // full listing
        link: null, // link to listing page for additional information
        title: "", // title of the listing
        price: null, // price of the listing
        description: null, // listing description
      };

      // Link and Title
      const links = section.querySelectorAll("a");
      links.map((link) => {
        if (
          link.attributes &&
          link.attributes.length >= 1 &&
          link.attributes[0].value === "listing-link"
        ) {
          sectionData.title =
            link.attributes[1].ownerElement.firstChild.nodeValue;
          sectionData.link = link.attributes[1].value;
        }
      });

      // Price and Description
      const details = section.querySelectorAll("p");
      details.map((item) => {
        if (item.attributes && item.attributes.length >= 1) {
          switch (item.attributes[0].value) {
            case "listing-price": {
              sectionData.price =
                item.attributes[1].ownerElement.firstChild.nodeValue;
              break;
            }
            case "listing-description": {
              sectionData.description =
                item.attributes[1].ownerElement.firstChild.nodeValue;
              break;
            }
          }
        }
      });

      results.push(sectionData);
    }
  });

  return results;
};

/**
 * Scrape listings selected sections
 * @param {String} country
 * @param {String} city
 * @param {String} address
 * @returns
 */
export const run = async (country, city, address) => {
  const fullCity = city.replaceAll(" ", "-").toLowerCase();
  const fullAddress = address.replaceAll(" ", "-").toLowerCase();

  // Modify the link to search for whatever needed (in this case it's rentals in Canada )
  const page = await fetch(
    `https://www.kijiji.ca/b-real-estate/${country}/${fullAddress}-${fullCity}/k0c34l0?origin=ALGOLIA`
  );
  const results = await page.text();
  return web(results);
};
