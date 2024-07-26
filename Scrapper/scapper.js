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
      let sectionData = {
        details: section.innerText(),
        link: null,
        title: "",
        price: null,
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

      // Price
      const price = section.querySelectorAll("p");
      price.map((item) => {
        if (
          item.attributes &&
          item.attributes.length >= 1 &&
          item.attributes[0].value === "listing-price"
        ) {
          sectionData.price =
            item.attributes[1].ownerElement.firstChild.nodeValue;
        }
      });

      // Description
      const description = section.querySelectorAll("p");
      description.map((item) => {
        if (
          item.attributes &&
          item.attributes.length >= 1 &&
          item.attributes[0].value === "listing-description"
        ) {
          sectionData.description =
            item.attributes[1].ownerElement.firstChild.nodeValue;
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
