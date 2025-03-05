import React from "react";

function Footer() {
  const li_classname = "ml-2 font-thin cursor-pointer";
  return (
    <div className="bg-slate-800 p-6">
      <div className="flex flex-wrap justify-around">
        <ul className="text-white mt-3 p-1">
          <li>
            <h3 className="text-lg font-medium font-appFont">ONLINE STORE</h3>
          </li>
          <li className={li_classname}>MEN CLOTHING</li>
          <li className={li_classname}>WOMEN CLOTHING</li>
          <li className={li_classname}>MEN ACCESSORY</li>
          <li className={li_classname}>WOMEN ACCESSORY</li>
        </ul>
        <ul className="text-white mt-3">
          <li>
            <h3 className="text-lg font-medium font-appFont">HELPFUL LINKS</h3>
          </li>
          <li className={li_classname}>HOME</li>
          <li className={li_classname}>ABOUT</li>
          <li className={li_classname}>CONTACT</li>
        </ul>
        <ul className="text-white mt-3 ">
          <li>
            <h3 className="text-lg font-medium font-appFont">ADDRESS</h3>
          </li>
          <li className={li_classname}>CENTREL EVANUE</li>
          <li className={li_classname}>LA-45384</li>
          <li className={li_classname}>HYDERABAD</li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
