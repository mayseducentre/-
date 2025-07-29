import React, { useState } from "react";
import Breadcrumb from "../breadcrumb";
import Header from "../header";

const AssessmentA = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [sheetUrl, setSheetUrl] = useState("");

  const classes = [
    "KG 2",
    "MEC 1",
    "MEC 2",
    "MEC 3",
    "MEC 4",
    "MEC 5",
    "MEC 6",
    "JHS 1",
    "JHS 2",
    "JHS 3",
  ];

  const subjects = [
    "Ga",
    "Computing",
    "Creative Art",
    "Math",
    "Science",
    "History",
    "Owop",
    "French",
    "Social",
    "English",
    "Health Safety",
    "Career Tech",
    "RME",
    "Library",
    "Programme Activities",
  ];

  // Link store — you can add more
  const sheetLinks = {
    "Computing_JHS 1":
      "https://docs.google.com/spreadsheets/d/1KnOXdHiGWrb7lSb-vdr-JlEgLof3ozaZ9LhvGANp9rU/edit",
    "Ga_JHS 1":
      "https://docs.google.com/spreadsheets/d/114HGIe6nWfyyG9FZTCJGR6qnYTDehps1SUOd0_VCK3A/edit",
    "Creative Art_JHS 1":
      "https://docs.google.com/spreadsheets/d/1qs8NYTKahDwZRukWgfhm_qm7Pnslp7mjPfr9_ofZMWQ/edit",
    "Math_JHS 1":
      "https://docs.google.com/spreadsheets/d/1-fo9pTkZjp4GK1btMtoiTZtfVGyHoepkHeh-Xzfhl2I/edit",
    "Science_JHS 1":
      "https://docs.google.com/spreadsheets/d/1CNeMx5O9ihY3UFhHo_yoGW4w5ibKU4096UV8DMim3eA/edit",
    "French_JHS 1":
      "https://docs.google.com/spreadsheets/d/1lqe4yunqzLQne9kUs-ZARuIbRCephnZTYDQQE6zhBj4/edit",
    "Social_JHS 1":
      "https://docs.google.com/spreadsheets/d/17ks9aqNWt5LkWqCjr3ii222KPTnZNYAnpBmOD7LNfm4/edit",
    "English_JHS 1":
      "https://docs.google.com/spreadsheets/d/1apHen2nErC-Q7WsHQaf_iVSrYD_vM2hZqavzE88IYzg/edit",
    "Career Tech_JHS 1":
      "https://docs.google.com/spreadsheets/d/1-pHtDu5ip2NxeLiHc1tER4_6A8eKXtPSjHTxQ46BBS8/edit",
    "RME_JHS 1":
      "https://docs.google.com/spreadsheets/d/1ealUCnjxIa22_8IRJRgo4kdAiWDLCOHaGezVytyNBmc/edit",
    "Library_JHS 2":
      "https://docs.google.com/spreadsheets/d/1oflvaxNOL1zxm4sbvxrmH4bwIbQvjC-SMtuVRHfED-8/edit",
    "Ga_JHS 2":
      "https://docs.google.com/spreadsheets/d/18QvI6c2fblakPah46Qn6VmK--YOYpHOlrUnjFA1uIfk/edit",
"Creative Art_JHS 2":"https://docs.google.com/spreadsheets/d/1DIbNYkjfrbN6wFxy2OsHnwe-6FHsSjDPl5XNAk-HK-0/edit",
    "Math_JHS 2":
      "https://docs.google.com/spreadsheets/d/1nCUTq_tfY4FcFwqaEs2JqGQRfXPX_yB18rmBf247JjY/edit",
    "Science_JHS 2":
      "https://docs.google.com/spreadsheets/d/1EG2VZdgyfV2zakNHr-IjApPhMbDT87SBrBVN-YsRXCM/edit",
    "French_JHS 2":
      "https://docs.google.com/spreadsheets/d/10iP7NdZ2SpQY8Yvo-K97SQl9tibFYgKe/edit",
    "Social_JHS 2":
      "https://docs.google.com/spreadsheets/d/10lNoyotl7ojqIGNjqyN7QHWmfS0D2-ptkmzQ8SRwR14/edit",
    "English_JHS 2":
      "https://docs.google.com/spreadsheets/d/1ph3fefsYU9B4mKkhZPnBL8pp56OTSeA4T0SgAOFNPGQ/edit",
    "Career Tech_JHS 2":
      "https://docs.google.com/spreadsheets/d/1pr1859XKZZ8ocvNeSpvaHK4fHIgan5nmifth2g-f5j8/edit",
    "RME_JHS 2":
      "https://docs.google.com/spreadsheets/d/1qB_BGJ5lw9DCf56K7t5_CQuWKL2ZwPytqJjqzOaEGPc/edit",
    "Computing_JHS 2":
      "https://docs.google.com/spreadsheets/d/1Fj93aJHc03dgzm01Nnww44xEurMg2keotjhV_tObZas/edit",
    "Ga_MEC 6":
      "https://docs.google.com/spreadsheets/d/15a51_5XLf12Ix4kksp3B3nipBLOQpFSUAWTid9OKakE/edit",
    "Owop_MEC 6":
      "https://docs.google.com/spreadsheets/d/1is9a0Z1Ut5Sr-Sfnml2Z1S5QPGIfnKs7czo9lblIeMk/edit",
    "RME_MEC 6":
      "https://docs.google.com/spreadsheets/d/1lLUsqByYaaROBClkDi79jTmKjeLdtefrMAhveI2Od_k/edit",
    "Career Tech_MEC 6":
      "https://docs.google.com/spreadsheets/d/1ow_Bx-4r0MYALqeeVh9Vuf7yfIvHh8-k9Qh13AaLLmA/edit",
    "French_MEC 6":
      "https://docs.google.com/spreadsheets/d/1PPAMJipSvjzNeZhaDt8c-b-_IyhqZDzElT2dRJRIbx8/edit",
    "Computing_MEC 6":
      "https://docs.google.com/spreadsheets/d/16Y4M5a2lFpPN0wJ3hWNL-QJhJusmjpzskF16-_3xQF0/edit",
    "Creative Art_MEC 6":
      "https://docs.google.com/spreadsheets/d/1IZbWCe5P2tbiv4MmKI0FMFpmEK6M4957Lm5w1eqmc5A/edit",
    "History_MEC 6":
      "https://docs.google.com/spreadsheets/d/1VDxUcCxJPOx1Ou7MvQPebxzqDjqt2mYt-TCJxY2vmuk/edit",
    "Health Safety":
      "https://docs.google.com/spreadsheets/d/1i1aryvZc3LYwB2eg7yRARo_aJGfamocuhEwd2kcBNz8/edit",
    "Science_MEC 6":
      "https://docs.google.com/spreadsheets/d/1CZACFBnZmmrI0b8mGMoooqAFwuayECsGxBwOPtydPEc/edit",
    "Math_MEC 6":
      "https://docs.google.com/spreadsheets/d/1OrtIyZvBPR8lyXROm3QLGBSToWW78DCMBGzw7GJNZTs/edit",
    "Library_MEC 6":
      "https://docs.google.com/spreadsheets/d/1OrtIyZvBPR8lyXROm3QLGBSToWW78DCMBGzw7GJNZTs/edit",
    "English_MEC 6":
      "https://docs.google.com/spreadsheets/d/1pE6IjWxWipJYv8_ckzGED_l3JLlV5CnMFOM68RPLRRs/edit",
    "Ga_MEC 5":
      "https://docs.google.com/spreadsheets/d/1f6enULj9D-IxTT8kChrnzwRBS3-Rxg8mayYsmrWMZYw/edit",
    "Owop_MEC 5":
      "https://docs.google.com/spreadsheets/d/1sDvvahISzrGhTYN9qSsqTxnWlORutYegsMV5Cu8LTRM/edit",
    "RME_MEC 5":
      "https://docs.google.com/spreadsheets/d/1JbsVJreSplAr1ggrIZKQAicEdf7RzfsdczV8hsk8fac/edit",
    "Career Tech_MEC 5":
      "https://docs.google.com/spreadsheets/d/19r4Dh0N5o9cBHK6KBAtNbbxKuCNYgevxQMqY6uob-2Y/edit",
    "French_MEC 5":
      "https://docs.google.com/spreadsheets/d/14M6fTErPyua5O861h_KLXBZTrPVYziih13n1w0FtIrU/edit",
    "Computing_MEC 5":
      "https://docs.google.com/spreadsheets/d/1V_hm0LTQaEl1T35H7sPik-GAO_xX9LF1OEkOod_Cp1E/edit",
    "Creative Art_MEC 5":
      "https://docs.google.com/spreadsheets/d/1OAqI1LamTp7LKd-HUytnHdl08NdmXv_EfGkbbYSUJ_0/edit",
    "History_MEC 5":
      "https://docs.google.com/spreadsheets/d/19-En6EYfZpvVyGaSlPFUboEvIcClxb1GK8dDBsz6Obc/edit",
    "Science_MEC 5":
      "https://docs.google.com/spreadsheets/d/1H5C7gQJRqvZIh6779LTBjBAA3vPLOkFtAlx-4-7gjlY/edit",
    "Math_MEC 5:":
      "https://docs.google.com/spreadsheets/d/1t3CqFhnRovJMB1ngHxwofdKwWBOlIiFHsYeuemepRZE/edit",
    "English_MEC 5":
      "https://docs.google.com/spreadsheets/d/1R_g5OhtHHmDVhE0E9OSahLyA_LWEwQm4nS7Gqr5CJpY/edit",
    "Library_MEC 5":
      "https://docs.google.com/spreadsheets/d/1wM2Y7WNiZ8VKcUgyTRu70oKkP8pJBQmakEwO3xWPeSs/edit",
    "Health Safety_MEC 5":
      "https://docs.google.com/spreadsheets/d/1RjcEq9gxlGlD2VNxRvej1G6-iNKiI7DQ4ZVHZZMrWzo/edit",
    "Ga_MEC 4":
      "https://docs.google.com/spreadsheets/d/1fACV11X8od5EVOGd3nlzEfbKankYFK5Ddy2TNErPhbI/edit",
    "Owop_MEC 4":
      "https://docs.google.com/spreadsheets/d/1ej43WJ20LlZBFTCB9MBe-hHleGYiyGp-MKXuwfz4quU/edit",
    "RME_MEC 4":
      "https://docs.google.com/spreadsheets/d/1MEUOg-rnAi1WCzwyIbpc_-KCmrgzdiPKXeR4GKYd-uQ/edit",
    "Career Tech_MEC 4":
      "https://docs.google.com/spreadsheets/d/1iVxEKi7kaF6ReFP_ML_2BeUddzKzb-PEdWElXiIfFSI/edit",
    "French_MEC 4":
      "https://docs.google.com/spreadsheets/d/1HwG4yIXM9q7_oYuklkRcIu9372vWpPpGsaL3Reycn7g/edit",
    "Computing_MEC 4":
      "https://docs.google.com/spreadsheets/d/1Dftl5hcXBeiYkNVHCZRmK6U1Y6lY7n3bUUMRFTiGN1M/edit",
    "Creative Art_MEC 4":
      "https://docs.google.com/spreadsheets/d/1ceCOYu7EBBc6MJ6qppAhzg4bvfQIv8wB7XhKX9SYOOM/edit",
    "History_MEC 4":
      "https://docs.google.com/spreadsheets/d/1HkXQhsU-mc30QHa-pIDMI6_yTXUPcIK-Jel32MLj1Po/edit",
    "Science_MEC 4":
      "https://docs.google.com/spreadsheets/d/1qAQUv10iGMhjWgTtfFugjBsEWEqugFYhJAihyXskV8U/edit",
    "Library_MEC 4":
      "https://docs.google.com/spreadsheets/d/1l5Htlayj8kdekt0dwIpBx5xEJePVDNmw4eY1htJpzqo/edit",
    "Math_MEC 4":
      "https://docs.google.com/spreadsheets/d/1bVMrf1Ek79H5aZX09DC34Ab7qKwnU8JA2y6F67YVAY4/edit",
    "English_MEC 4":
      "https://docs.google.com/spreadsheets/d/1rva6Tv_02ruRQKYWtuscOV5Bh8naRZMUjEfD9H0DA5Y/edit",
    "Health Safety_MEC 4":
      "https://docs.google.com/spreadsheets/d/1d18-Nuf1-I72BgSYjNCwz2qkHf7V7hv5PFLNJVryI6c/edit",
    "Ga_MEC 1":
      "https://docs.google.com/spreadsheets/d/1zKJXHuITUD23D6brbZenWYEChXi7F2vgWYCYm_4Q_Fk/edit",
    "RME_MEC 1":
      "https://docs.google.com/spreadsheets/d/13kXsvKbZTFb0Vx-vol7_zH2EvqnhN35-ZSHOTxQU3zc/edit",
    "Health Safety_MEC 1":
      "https://docs.google.com/spreadsheets/d/18ssxEvTL8m2-4_ENBhAIyzieJ2tuJBP3AGz_lxmV7sE/edit",
    "French_MEC 1":
      "https://docs.google.com/spreadsheets/d/1cAAnSX7JRg5zUH1jzg_Nh90f3_wBLDeyOzA7Y37Iu_A/edit",
    "Computing_MEC 1":
      "https://docs.google.com/spreadsheets/d/1ylo07zX0Hy4YkJ9aPbbidNmluGNTGZJVsCCUte--5Rc/edit",
    "History_MEC 1":
      "https://docs.google.com/spreadsheets/d/1UD3zU5IqXL_pFNviGm8BgZzKO7bO2D4AX2ft2oyz5qY/edit",
    "Science_MEC 1":
      "https://docs.google.com/spreadsheets/d/1yu1hPpdc1813AYAoPrsW_QdD1ylXw-gxvr7tPpBBIlY/edit",
    "Math_MEC 1":
      "https://docs.google.com/spreadsheets/d/1Ifa4uFvjGp6NP3IC5z7G7QaNCrtPVw7Pt_Lscagrsv8/edit",
    "English_MEC 1":
      "https://docs.google.com/spreadsheets/d/11_Pt8hScfsrD5cVm0zXRAJXH3hElGZsuqo59d0RKxhA/edit?usp=drive_link",
    "Programme Activities_MEC 1":
      "https://docs.google.com/spreadsheets/d/1FVgLGfBv3ezUobJ6E7w3lV4BXoPHz2TslFkKju51qMQ/edit",
    "Library_MEC 1":
      "https://docs.google.com/spreadsheets/d/1icLG0Fpk4EdGXjbMgvdwg8Rm1qGvSD2OcI5rn0-tGzI/edit",
    "Creative Art_MEC 1":
      "https://docs.google.com/spreadsheets/d/1n-QeIGgQgpkyvRle_-74ByW7_XGVlzrkTl07YnykIGU/edit",
    "Ga_MEC 2":
      "https://docs.google.com/spreadsheets/d/1wSuOHxaiD17xuNPJpHUh5BJNCB4Qsd-3VUwDQq6LH6E/edit",
    "RME_MEC 2":
      "https://docs.google.com/spreadsheets/d/1rVMCAi6d83LVtU-RgeCk50kOopoaU7HlbJ6f0C6ectU/edit",
    "French_MEC 2":
      "https://docs.google.com/spreadsheets/d/1xzpmCptwBwDSYCZ-F-NTIRxXiMbjmVR866wSHcKiwhM/edit",
    "Computing_MEC 2":
      "https://docs.google.com/spreadsheets/d/1KvdRwWQU-He_1sWWNgGr9htCBN9afTKDbo3pZYiPEek/edit",
    "Creative Art_MEC 2":
      "https://docs.google.com/spreadsheets/d/1TA8FVt9cleAN_Xyri39nrrvMyScjIR2EgflQMHY88OE/edit",
    "History_MEC 2":
      "https://docs.google.com/spreadsheets/d/1MPRQ-88WesWFXc7wzvrrpm7ESbfXmwS1-xMBb4j8ZZA/edit",
    "Science_MEC 2":
      "https://docs.google.com/spreadsheets/d/1Gl0vMmAuXiNtOjKypFYGM_lRQ1tKGf41Gvo22fiduU8/edit",
    "Math_MEC 2":
      "https://docs.google.com/spreadsheets/d/1WoO4BdidpiEaslbSppHvC3EYgpB_KEj5PxTcfWNFmes/edit",
    "Library_MEC 2":
      "https://docs.google.com/spreadsheets/d/1dX_fX8YWsVGqZ45hhf2oRiKzRC0fhaDprQEcU3gfCjI/edit",
    "English_MEC 2":
      "https://docs.google.com/spreadsheets/d/1xHUbweY8XH8IMuyMGPHZvIHKwNu4eQs2LkUrvxGBz5s/edit",
    "Programme Activities_MEC 2":
      "https://docs.google.com/spreadsheets/d/1jBHNRWOggln5nkjn99bPHBusYP46MKtTonwgpb1HDnQ/edit",
    "Health Safety_MEC 2":
      "https://docs.google.com/spreadsheets/d/1gKR6T0FB-avgOn3nmnW2mtj9_-vNgbcNBCPZFLzvw2E/edit",

    "Ga_MEC 3":
      "https://docs.google.com/spreadsheets/d/1XZLnKP0tY9VMjWp7fX1jdq600h9wkQEivgjM8lzk-h4/edit",
    "Owop_MEC 3":
      "https://docs.google.com/spreadsheets/d/1o7LOxgwlttzTk3DwCy9E9jyFGAcgq1E8uX4CqYLT22A/edit",
    "Library_MEC 3":
      "https://docs.google.com/spreadsheets/d/1HygoMVRSNXB3zvcRq763lzlPKXEXWxjwU8THU4Jn-4o/edit",
    "RME_MEC 3":
      "https://docs.google.com/spreadsheets/d/1fH1No6FglASMGNBvXBD2NpdCdfYCrBfAGNzEhb0lrK8/edit",
    "Health Safety_MEC 3":
      "https://docs.google.com/spreadsheets/d/1Cp1ThaDGSgeD1DZd2kfeGM0SLuePE64CfGaywOiUFWk/edit",
    "French_MEC 3":
      "https://docs.google.com/spreadsheets/d/1apTPBXRK6GhtfGsQIh9XTyHNiKsVgAaoamPGQ7xrWZw/edit",
    "Computing_MEC 3":
      "https://docs.google.com/spreadsheets/d/15C67kvCELI8srfzsdv8tXhiBwbWkGKcCRgxrcvY65mM/edit",
    "Creative Art_MEC 3":
      "https://docs.google.com/spreadsheets/d/1v4ymkM7VdJX3BRnZIPi2vsiENot_WmP75Rf3-HWdxO4/edit",
    "History_MEC 3":
      "https://docs.google.com/spreadsheets/d/1MHqx9OeyZVkm_lu6so4O58xq81OgzwAJW60ogSWVdxw/edit",
    "Science_MEC 3":
      "https://docs.google.com/spreadsheets/d/1T9JTqOYAqqMGbXh_ICuSsYSckTqEosNA0cfiBOiHuAw/edit",
    "Math_MEC 3":
      "https://docs.google.com/spreadsheets/d/11u_e-FS-UKsrSF6WiQVDy6ich4toIfKIYHY4MwKab0w/edit",
    "English_MEC 3":
      "https://docs.google.com/spreadsheets/d/1KQbETabDTfPX2kIEIG4CLFGjWg1_TrTBUrUnmsQKPPo/edit",
  };
  function accesspermit() {
    var prmp = window.prompt("Enter pin");
    if (prmp === "2025.") {
      handleLoad();
    } else {
      alert("Permission not granted");
    }
  }

  function fullA() {
    var permit = window.prompt("Enter passcode for access");

    if (permit === "2025.") {
      window.location.href="https://drive.google.com/drive/folders/1KT79g50HuGJo8D-k1H5tzaEb4yaEQTM9?usp=drive_link";
    } else {
      alert("Sorry, permission not granted");
    }
  }
  function editaccess(){
      var access=window.prompt("Enter passcode");
      if(access === "2025."){
            handleEdit();
      
      }
      else{
            alert("Please request access.")
      }
  }
  const handleLoad = () => {
    const key = `${selectedSubject}_${selectedClass}`;
    const link = sheetLinks[key];

    if (link) {
      const embedLink = link.replace("/edit", "/edit?usp=drivesdk");
      setSheetUrl(embedLink);
    } else {
      alert("No Google Sheet found for this selection.");
    }
  };

  const handleEdit = () => {

    const key = `${selectedSubject}_${selectedClass}`;
    const link = sheetLinks[key];
    if (link) {
      const editLink = link.replace("/edit", "/edit?pli=1&authuser=0");
      window.open(editLink, "_blank");
    } else {
      alert("No editable link found.");
    }
  };

  return (
    <>
      <Breadcrumb title="Assessment - Admin" />
      <Header />
      <br />
      <p>
        Please download Google Sheet from the playstore or apple store for
        mobile devices to be able to edit sheet.
      </p>
      <p>The system automatically updates itself. No need to save and change formulas. Teachers must be granted access. Teachers hub link:<a href="https://mayseducentre.github.io/-/#/assess">here</a></p>
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          maxWidth: "900px",
          margin: "2rem auto",
          padding: "2rem",
          border: "1px solid #e0e0e0",
          borderRadius: "12px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            textAlign: "center",
            marginBottom: "2rem",
            color: "#2c3e50",
          }}
        >
          Excel Assessment Sheet - Admin
        </h1>
        <a onClick={fullA} style={{color:"blue",pointer:"cursor"}}>Get full Assessment files</a>
        <div style={{ marginBottom: "1rem" }}>
          <label
            style={{
              display: "block",
              marginBottom: "6px",
              fontWeight: "bold",
            }}
          >
            Select Class:
          </label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            style={{
              padding: "10px",
              width: "100%",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">-- Choose Class --</option>
            {classes.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label
            style={{
              display: "block",
              marginBottom: "6px",
              fontWeight: "bold",
            }}
          >
            Select Subject:
          </label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            style={{
              padding: "10px",
              width: "100%",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">-- Choose Subject --</option>
            {subjects.map((subj) => (
              <option key={subj} value={subj}>
                {subj}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
          <button
            onClick={accesspermit}
            style={{
              padding: "12px 20px",
              backgroundColor: "#3498db",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Preview Sheet
          </button>
          <button
            onClick={editaccess}
            style={{
              padding: "12px 20px",
              backgroundColor: "#2ecc71",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Edit in Sheet
          </button>
        </div>

        {sheetUrl && (
          <iframe
            title="Google Sheet Preview"
            src={sheetUrl}
            width="100%"
            height="600px"
            style={{
              border: "1px solid #ccc",
              borderRadius: "6px",
            }}
          />
        )}
      </div>

      <br/>
      <br/>
    </>
  );
};

export default AssessmentA;
