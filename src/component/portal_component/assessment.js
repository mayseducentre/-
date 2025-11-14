import React, { useState, useEffect } from "react";
import Breadcrumb from "../breadcrumb";
import Header from "../header";

const Assessment = () => {
  // Original selection state
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [sheetUrl, setSheetUrl] = useState("");

  // New UI / feature state (localStorage only)
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("mec_darkmode") === "true"
  );
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("mec_history")) || [];
    } catch {
      return [];
    }
  });
  const [pinned, setPinned] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("mec_pinned")) || {};
    } catch {
      return {};
    }
  });
  const [stats, setStats] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("mec_stats")) || {};
    } catch {
      return {};
    }
  });
  const [enteredAverage, setEnteredAverage] = useState("");
  const [notification, setNotification] = useState("");
  const [praise, setPraise] = useState("");

  // Original arrays
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
    "Rhymes and Poems",
    "Writing and Composition",
    "Phonics",
    "Reading and Comprehension",
  ];

  // === FULL original sheetLinks object (kept intact) ===
  const sheetLinks = {
    "Computing_JHS 3":
      "https://docs.google.com/spreadsheets/d/1OAWkER1YnPXnN-VYR1wOuRUVkhSupw8B3_VIBt_6MAg/edit?usp=drivesdk/edit",
    "Ga_JHS 3":
      "https://docs.google.com/spreadsheets/d/1LKMVJqNSzNJHSuqk10-22Vi2XeGSd6Y13w43JFKHgvU/edit?usp=drivesdk/edit",
    "Creative Art_JHS 3":
      "https://docs.google.com/spreadsheets/d/1SVeU1xSMhFJenEhnrdaKjZdCccsDZFmQGql6KlIGhrA/edit?usp=drivesdk/edit",
    "Math_JHS 3":
      "https://docs.google.com/spreadsheets/d/1cNsWVboNqBY1EYr7T7rd97IWJ3_9ayXsE4y-ObRXHZk/edit?usp=drivesdk/edit",
    "Science_JHS 3":
      "https://docs.google.com/spreadsheets/d/1OE7R5qr7N2_0ALl62HFQ7KEnUI362BKtzO7N7pyIchE/edit?usp=drivesdk/edit",
    "French_JHS 3":
      "https://docs.google.com/spreadsheets/d/12_WjsxUeNrWJFaTfHgnHoLklxnHovW2PQUy7N2dB0oM/edit?usp=drivesdk/edit",
    "Social_JHS 3":
      "https://docs.google.com/spreadsheets/d/1-hjTIp66jhuQ-gY_R3OAGkfn_f5crDa-sxD-wSgNr7E/edit?usp=drivesdk/edit",
    "English_JHS 3":
      "https://docs.google.com/spreadsheets/d/13tDzfxNPNcajCkvAHWHWAByoZZPv0MH-UXYHkr5y3WQ/edit?usp=drivesdk/edit",
    "Career Tech_JHS 3":
      "https://docs.google.com/spreadsheets/d/1BdtOA0ncuZ8FZfcOdZ_jdYZsv0joALAzzJrtnzqFGNQ/edit?usp=drivesdk/edit",
    "RME_JHS 3":
      "https://docs.google.com/spreadsheets/d/1l8rEnFI6Ixy3Qtyp4o_wPJWM7tyT0pzsfMFLDcJgPm0/edit?usp=drivesdk/edit",
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
    "Creative Art_JHS 2":
      "https://docs.google.com/spreadsheets/d/1U7Xmk6Bixu6XuqWdZjsI9r_pQwyZ2-_yATxplBiL9nk/edit",
    "Math_JHS 2":
      "https://docs.google.com/spreadsheets/d/1nCUTq_tfY4FcFwqaEs2JqGQRfXPX_yB18rmBf247JjY/edit",
    "Science_JHS 2":
      "https://docs.google.com/spreadsheets/d/1EG2VZdgyfV2zakNHr-IjApPhMbDT87SBrBVN-YsRXCM/edit",
    "French_JHS 2":
      "https://docs.google.com/spreadsheets/d/1tBdJ_Z8Od6RkEAR_OX-f06HLynr2_C1VNShIFH4ipdE/edit",
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
      "https://docs.google.com/spreadsheets/d/1sOFWeCozZhjL8pLRCnuRkBzhJ4whsHjIvVAvx8kQ1To/edit",
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
      "https://docs.google.com/spreadsheets/d/1H5C7qQJRqvZIh6779LTBjBAA3vPLOkFtAlx-4-7gjlY/edit",
    "Math_MEC 5":
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
      "https://docs.google.com/spreadsheets/d/1HwG4yIXM9q7_oYuklkRcIu937vWpPpGsaL3Reycn7g/edit",
    "Computing_MEC 4":
      "https://docs.google.com/spreadsheets/d/1Dftl5hcXBeiYkNVHCZRmK6U1Y6lY7n3bUUMRFTiGN1M/edit",
    "Creative Art_MEC 4":
      "https://docs.google.com/spreadsheets/d/1ceCOYu7EBBc6MJ6qppAhzg4bvfQIv8wB7XhKX9SYOOM/edit",
    "History_MEC 4":
      "https://docs.google.com/spreadsheets/d/1HkXQhs0-mc30QHa-pIDMI6_yTXUPcIK-Jel32MLj1Po/edit",
    "Science_MEC 4":
      "https://docs.google.com/spreadsheets/d/1qAQUv10iGMhjWgTtfFugjBsEWEqugFYhJAihyXskV8U/edit",
    "Library_MEC 4":
      "https://docs.google.com/spreadsheets/d/1l5Htlayj8kdekt0dwIpBx5xEJePVDNmw4eY1htJpzqo/edit",
    "Math_MEC 4":
      "https://docs.google.com/spreadsheets/d/1bVMrf1Ek79H5aZX09DC34Ab7qKwnU8JA2y6F67YVAY4/edit",
    "English_MEC 4":
      "https://docs.google.com/spreadsheets/d/1rva6Tv_02ruRQKYWtuscOV5Bh8naRZMUjEfD9H0DA5Y/edit",
    "Health Safety_MEC 4":
      "https://docs.google.com/spreadsheets/d/1d18-Nuf1-I72BgSYjNCw2qkAip7hv5PFLNJVryI6c/edit",
    "Ga_MEC 1":
      "https://docs.google.com/spreadsheets/d/1zKJXHuITUD23D6brbZenWYEChXi7F2vgWYCYm_4Q_Fk/edit",
    "RME_MEC 1":
      "https://docs.google.com/spreadsheets/d/13kXsvKbZTFb0Vx-vol7_zH2EvqnhN35-ZSHOTxQU3zc/edit",
    "Health Safety_MEC 1":
      "https://docs.google.com/spreadsheets/d/18ssxEvTL8m2-4_ENBhAIyzieJ2tuJBP3AGz_lxmV7sE/edit",
    "French_MEC 1":
      "https://docs.google.com/spreadsheets/d/1cAAnSX7JRg5zUH1jzg_Nh90f3_wBLDeyOzA7Y37Iu_A/edit",
    "Computing_MEC 1":
      "https://docs.google.com/spreadsheets/d/1ylo07zX0Hy4YkJ9cPbbidNmluGNTGZJVsCCUte--5Rc/edit",
    "History_MEC 1":
      "https://docs.google.com/spreadsheets/d/1UD3zU5IqXL_pFNviGm8BgZzKO7bO2D4AX2ft2oyz5qY/edit",
    "Science_MEC 1":
      "https://docs.google.com/spreadsheets/d/1yu1hPpdc1813AYAoPrsW_QdD1ylXw-gxvr7tPpBBIlY/edit",
    "Math_MEC 1":
      "https://docs.google.com/spreadsheets/d/1Ifa4uFvjGp6NP3IC5z7G7QaNCrtPVw7Pt_Lscagrsv8/edit",
    "English_MEC 1":
      "https://docs.google.com/spreadsheets/d/11_Pt8hScfsrD5cVm0zXRAJXH3hElGZsuqo59d0RKxhA/edit",
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
      "https://docs.google.com/spreadsheets/d/1dX_f8YWsVGqZ45hhf2oRiKzRC0fhaDprQEcU3gfCjI/edit",
    "English_MEC 2":
      "https://docs.google.com/spreadsheets/d/1xHUbweY8H8IMuyMGPHZvIHKwNu4eQs2LkUrvxGBz5s/edit",
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
      "https://docs.google.com/spreadsheets/d/1apTPBXRK6GhtfGsQIh9XTyHNiKsVAAoamPGQ7xrWZw/edit",
    "Computing_MEC 3":
      "https://docs.google.com/spreadsheets/d/15C67kvCELI8srfzsdv8tXhiBwbWkGKcCRgxrcvY65mM/edit",
    "Creative Art_MEC 3":
      "https://docs.google.com/spreadsheets/d/1v4ymkM7VdJX3BRnZIPi2vsiENot_WmP75Rf3-HWdxO4/edit",
    "History_MEC 3":
      "https://docs.google.com/spreadsheets/d/1MHqx9OeyZVkm_lu6so4O58xq81OgzwAJW60ogSWVdxw/edit",
    "Science_MEC 3":
      "https://docs.google.com/spreadsheets/d/1T9JTqOYAqqMGbX_ICuSsYSckTqEosNA0cfiBOiHuAw/edit",
    "Math_MEC 3":
      "https://docs.google.com/spreadsheets/d/11u_e-FS-UKsrSF6WiQVDy6ich4toIfKIYHY4MwKab0w/edit",
    "English_MEC 3":
      "https://docs.google.com/spreadsheets/d/1KQbETabDTfPX2kIEIG4CLFGjWg1_TrTBUrUnmsQKPPo/edit",
    "Ga_KG 2":
      "https://docs.google.com/spreadsheets/d/1GFj_DtsAKBTycktCUGFpi7Zv2J7E8OAPywrBidg92Ow/edit",
    "Owop_KG 2":
      "https://docs.google.com/spreadsheets/d/1GLxmF6nQbH12UDcX91pBFAJE0K7i8PnGGKB8Zfb2ktc/edit",
    "RME_KG 2":
      "https://docs.google.com/spreadsheets/d/15lEOZxCHq4i3hQ7VqCKz79DqO6V0G2Db89G1398QhXA/edit",
    "Phonics_KG 2":
      "https://docs.google.com/spreadsheets/d/1m_6ZJ4xL3Kb6rti7Pq64fncx5-2jBpnV3JLc-i1QRvQ/edit",
    "Writing and Composition_KG 2":
      "https://docs.google.com/spreadsheets/d/1YL-djx7fdlT0Vvxaod84oGxe7L1oTz1G-7LWEoiePrg/edit",
    "Rhymes and Poems_KG 2":
      "https://docs.google.com/spreadsheets/d/1h2QMx8Wa1590O-Pcn_6gkdFe4fZugDwsB59KHmIu8rY/edit",
    "Reading and Comprehension_KG 2":
      "https://docs.google.com/spreadsheets/d/1KQbETabDTfPX2kIEIG4CLFGjWg1_TrTBUrUnmsQKPPo/edit",
    "French_KG 2":
      "https://docs.google.com/spreadsheets/d/1d2wab-G2F2o0CU3nvSv9vKt-4tqzDmskD13EDcVwj7c/edit",
    "Computing_KG 2":
      "https://docs.google.com/spreadsheets/d/1NLKi3DSG1kf420b8sVMfPoB6naN_HgGsqmye9OoTlvc/edit",
    "Creative Art_KG 2":
      "https://docs.google.com/spreadsheets/d/1NqEbFqW5EG3aRnOZwUoFQ5uwba3epameH2u-ztvcZ9g/edit",
    "History_KG 2":
      "https://docs.google.com/spreadsheets/d/1fWxT_LYZpBvmqWqVN7pdCzjvffk5yCGpaP5-OEi0s/edit",
    "Science_KG 2":
      "https://docs.google.com/spreadsheets/d/15lEOZxCHq4i3hQ7VqCKz79DqO6V0G2Db89G1398QhXA/edit",
    "Math_KG 2":
      "https://docs.google.com/spreadsheets/d/1_30LJ_EkkHMhMzSg3cfm4__Fd09umiCIMOjIFJaTuRo/edit",
    "English_KG 2":
      "https://docs.google.com/spreadsheets/d/150YfNNTpqLYR7liQDEGrejMZ_5-UUpAxNg7GJE0iDzU/edit"
  };
  // === end of sheetLinks ===

  // --- helper utilities (local-only) ---
  function saveHistory(entry) {
    const next = [entry, ...history].slice(0, 50); // cap to 50 items
    setHistory(next);
    localStorage.setItem("mec_history", JSON.stringify(next));
  }

  function incrementPinned(key) {
    const next = { ...pinned };
    next[key] = (next[key] || 0) + 1;
    setPinned(next);
    localStorage.setItem("mec_pinned", JSON.stringify(next));
  }

  function saveStat(key, avg) {
    const next = { ...stats, [key]: { avg: Number(avg), when: new Date().toISOString() } };
    setStats(next);
    localStorage.setItem("mec_stats", JSON.stringify(next));
  }

  // Keep original permission and load logic but extended
  function accesspermit() {
    var prmp = window.prompt("Enter pin");
    if (prmp === "2025.") {
      handleLoad();
    } else {
      alert("Permission not granted");
    }
  }

  const handleLoad = () => {
    const key = `${selectedSubject}_${selectedClass}`;
    const link = sheetLinks[key];

    if (link) {
      const embedLink = link.replace("/edit", "/edit?usp=drivesdk");
      setSheetUrl(embedLink);

      // track history & pinned quick links
      const entry = {
        key,
        subject: selectedSubject,
        class: selectedClass,
        action: "Loaded Sheet",
        ts: new Date().toISOString(),
      };
      saveHistory(entry);
      incrementPinned(key);

      // smart notifications: check last time it was edited or loaded
      checkNotifications(key);
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

      const entry = {
        key,
        subject: selectedSubject,
        class: selectedClass,
        action: "Opened for Edit",
        ts: new Date().toISOString(),
      };
      saveHistory(entry);
      incrementPinned(key);
    } else {
      alert("No editable link found.");
    }
  };

  // teacher can paste the class average here after viewing Google Sheet
  const saveClassAverage = () => {
    if (!selectedClass || !selectedSubject) {
      alert("Select class and subject first.");
      return;
    }
    const key = `${selectedSubject}_${selectedClass}`;
    const avg = Number(enteredAverage);
    if (isNaN(avg)) {
      alert("Please enter a valid number for average (e.g. 72.5)");
      return;
    }

    const previous = stats[key]?.avg;
    saveStat(key, avg);
    const entry = {
      key,
      subject: selectedSubject,
      class: selectedClass,
      action: `Saved average: ${avg}`,
      ts: new Date().toISOString(),
    };
    saveHistory(entry);

    // Praise & Performance insight (feature 15)
    if (previous !== undefined) {
      const diff = Number((avg - previous).toFixed(2));
      if (diff > 0) {
        setPraise(`Class average improved by ${diff} points since last record — excellent work!`);
      } else if (diff < 0) {
        setPraise(`Class average dropped by ${Math.abs(diff)} points since last record. Consider remedial actions.`);
      } else {
        setPraise("Class average stayed the same as the last record.");
      }
    } else {
      setPraise("Average saved. We'll keep this as the baseline for future comparisons.");
    }

    setEnteredAverage("");
    // clear notification after saving to let praise show
    setNotification("");
    // auto-clear praise after a while
    setTimeout(() => setPraise(""), 14000);
  };

  // Smart notifications (simple rules, local): if last action > 14 days => remind
  function checkNotifications(key) {
    const last = history.find((h) => h.key === key);
    if (!last) {
      setNotification("You haven't accessed this class/subject before. Good to keep records.");
      return;
    }
    const then = new Date(last.ts);
    const now = new Date();
    const days = Math.round((now - then) / (1000 * 60 * 60 * 24));
    if (days >= 14) {
      setNotification(`It's been ${days} days since you last opened this sheet. Consider reviewing student progress.`);
    } else if (days >= 7) {
      setNotification(`You last opened this sheet ${days} days ago. A quick check-in could help.`);
    } else {
      setNotification(""); // no notification if recently accessed
    }
  }

  // UI helpers: persist changes
  useEffect(() => {
    localStorage.setItem("mec_history", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem("mec_pinned", JSON.stringify(pinned));
  }, [pinned]);

  useEffect(() => {
    localStorage.setItem("mec_stats", JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem("mec_darkmode", darkMode ? "true" : "false");
  }, [darkMode]);

  // compute pinned quick links sorted
  const topPinned = Object.entries(pinned)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([k, v]) => ({ key: k, count: v }));

  // professional inline styles
  const containerStyle = {
    fontFamily: "Inter, Arial, sans-serif",
    maxWidth: "1000px",
    margin: "2rem auto",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: darkMode ? "0 10px 30px rgba(0,0,0,0.6)" : "0 8px 24px rgba(0,0,0,0.08)",
    background: darkMode ? "#0f1724" : "#ffffff",
    color: darkMode ? "#e6eef8" : "#234",
    border: darkMode ? "1px solid rgba(255,255,255,0.04)" : "1px solid #e6eef2",
  };

  const inputStyle = {
    padding: "10px",
    width: "100%",
    borderRadius: "8px",
    border: darkMode ? "1px solid #233" : "1px solid #cfd8e3",
    background: darkMode ? "#0b1220" : "#fff",
    color: darkMode ? "#e6eef8" : "#112",
  };

  return (
    <>
      <Breadcrumb
        title="Assessment"
        image="https://lh3.googleusercontent.com/pw/AP1GczN8cldYGzvjtGr1XZBRZNMDfOfRobaZyekFh7cPZ3ZNHU5tDIjW-OMHoVUgUqw_2F7L44AlDdyBr0j-FJcw-14A04NYy9NSz6P_xVKOpXfHGXEBk4e"
      />
      <Header />
      <br />
      <div style={{ padding: "0 1rem", maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <h2 style={{ margin: 0, color: darkMode ? "#cfe6ff" : "#1b3b5a" }}>
            Teacher Assessment Management Portal
          </h2>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <label style={{ fontSize: 13 }}>{darkMode ? "Professional Mode" : "Light Mode"}</label>
            <button
              onClick={() => setDarkMode(!darkMode)}
              style={{ padding: "8px 12px", borderRadius: 8, cursor: "pointer", border: "none", background: darkMode ? "#1f2937" : "#eef6fb" }}
            >
              {darkMode ? "🌙" : "🌞"}
            </button>
          </div>
        </div>
      </div>

      <div style={containerStyle}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "1.2rem" }}>
          <div>
            <h3 style={{ marginTop: 0 }}>Excel Assessment Sheet</h3>

            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", marginBottom: 6, fontWeight: "600" }}>Select Class:</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                style={inputStyle}
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
              <label style={{ display: "block", marginBottom: 6, fontWeight: "600" }}>Select Subject:</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                style={inputStyle}
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
                  padding: "12px 18px",
                  borderRadius: 8,
                  cursor: "pointer",
                  border: "none",
                  background: "#2563eb",
                  color: "white",
                  fontWeight: 700,
                }}
              >
                Load Sheet
              </button>
              <button
                onClick={handleEdit}
                style={{
                  padding: "12px 18px",
                  borderRadius: 8,
                  cursor: "pointer",
                  border: "none",
                  background: "#059669",
                  color: "white",
                  fontWeight: 700,
                }}
              >
                Edit in Sheet
              </button>
            </div>

            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "block", fontWeight: 600 }}>Enter class average (optional)</label>
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <input
                  value={enteredAverage}
                  onChange={(e) => setEnteredAverage(e.target.value)}
                  placeholder="e.g. 72.5"
                  style={{ ...inputStyle, width: "160px" }}
                />
                <button
                  onClick={saveClassAverage}
                  style={{ padding: "10px 12px", borderRadius: 8, border: "none", cursor: "pointer", background: "#0ea5a4", color: "#012" }}
                >
                  Save Average
                </button>
                <div style={{ alignSelf: "center", fontSize: 13, color: darkMode ? "#9fb7d8" : "#2b475f" }}>{notification}</div>
              </div>
            </div>

            {sheetUrl && (
              <div style={{ marginTop: 12 }}>
                <iframe
                  title="Google Sheet Preview"
                  src={sheetUrl}
                  width="100%"
                  height="520px"
                  style={{ borderRadius: 8, border: darkMode ? "1px solid rgba(255,255,255,0.04)" : "1px solid #d7e2ef" }}
                />
              </div>
            )}

            <div style={{ marginTop: 18 }}>
              <h4 style={{ marginBottom: 8 }}>Assessment History</h4>
              <div style={{ maxHeight: 220, overflow: "auto", padding: 8, borderRadius: 8, background: darkMode ? "#071029" : "#fbfeff" }}>
                {history.length === 0 && <div style={{ color: darkMode ? "#9fb7d8" : "#6b7280" }}>No history yet. Actions like 'Load Sheet' and 'Edit in Sheet' will appear here.</div>}
                {history.map((h, idx) => (
                  <div key={idx} style={{ padding: 8, borderBottom: "1px solid rgba(0,0,0,0.04)", display: "flex", justifyContent: "space-between", gap: 8 }}>
                    <div>
                      <div style={{ fontWeight: 700 }}>{h.action}</div>
                      <div style={{ fontSize: 12, opacity: 0.85 }}>{h.subject} • {h.class}</div>
                    </div>
                    <div style={{ textAlign: "right", fontSize: 12, color: darkMode ? "#8fb2db" : "#4b5563" }}>{new Date(h.ts).toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside>
            <div style={{ padding: 12, borderRadius: 10, background: darkMode ? "#021020" : "#fcfeff", border: darkMode ? "1px solid rgba(255,255,255,0.02)" : "1px solid #eef6fb" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 13, opacity: 0.9 }}>Quick Links</div>
                  <div style={{ fontWeight: 800, fontSize: 18 }}>Pinned Classes</div>
                </div>
              </div>

              <div style={{ marginTop: 12 }}>
                {topPinned.length === 0 && <div style={{ color: darkMode ? "#89add6" : "#6b7280" }}>Your most accessed class-subject pairs will show here.</div>}
                {topPinned.map((p) => {
                  const [subj, cls] = p.key.split("_");
                  return (
                    <div key={p.key} style={{ display: "flex", justifyContent: "space-between", padding: "8px 6px", borderRadius: 8 }}>
                      <div>
                        <div style={{ fontWeight: 700 }}>{subj} — {cls}</div>
                        <div style={{ fontSize: 12, opacity: 0.85 }}>{p.count} visits</div>
                      </div>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <button onClick={() => {
                          const link = sheetLinks[p.key];
                          if (link) window.open(link.replace("/edit", "/edit?pli=1&authuser=0"), "_blank");
                        }} style={{ padding: "6px 8px", borderRadius: 6, border: "none", cursor: "pointer", background: "#3b82f6", color: "white" }}>Open</button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <hr style={{ margin: "12px 0", border: 0, height: 1, background: darkMode ? "rgba(255,255,255,0.03)" : "#eef6fb" }} />

              <div>
                <div style={{ fontWeight: 800 }}>Praise & Performance</div>
                <div style={{ fontSize: 12, opacity: 0.9, marginTop: 6 }}>Quick insights based on saved averages.</div>

                <div style={{ marginTop: 10 }}>
                  {Object.keys(stats).length === 0 && <div style={{ color: darkMode ? "#9fb7d8" : "#6b7280" }}>No saved averages yet. Use the 'Enter class average' box after checking your Google Sheet.</div>}
                  {Object.entries(stats).slice(0, 6).map(([k, v]) => {
                    const [subj, cls] = k.split("_");
                    return (
                      <div key={k} style={{ padding: 8, borderRadius: 8, marginTop: 8, background: darkMode ? "#041225" : "#fff" }}>
                        <div style={{ fontWeight: 700 }}>{subj} • {cls}</div>
                        <div style={{ fontSize: 12 }}>Average: {v.avg} • Recorded: {new Date(v.when).toLocaleDateString()}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <hr style={{ margin: "12px 0", border: 0, height: 1, background: darkMode ? "rgba(255,255,255,0.03)" : "#eef6fb" }} />

              <div>
                <div style={{ fontWeight: 800 }}>Smart Notifications</div>
                <div style={{ marginTop: 8, fontSize: 13 }}>{notification || "All caught up — no alerts right now."}</div>
              </div>
            </div>

            <div style={{ marginTop: 12, padding: 12, borderRadius: 10, background: darkMode ? "#02131f" : "#fff" }}>
              <div style={{ fontWeight: 800 }}>Quick Actions</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
                <button onClick={() => { navigator.clipboard.writeText(JSON.stringify(history.slice(0, 10), null, 2)); alert("Last 10 history items copied to clipboard (for sharing).") }} style={{ padding: 10, borderRadius: 8, border: "none", cursor: "pointer", background: "#7c3aed", color: "white" }}>Copy Recent History</button>
                <button onClick={() => { localStorage.removeItem("mec_history"); setHistory([]); alert("History cleared locally.") }} style={{ padding: 10, borderRadius: 8, border: "none", cursor: "pointer", background: "#ef4444", color: "white" }}>Clear History</button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: "1.4rem auto", padding: "0 1rem" }}>
        {praise && <div style={{ padding: 12, borderRadius: 8, background: "#fffbeb", color: "#7c4a00", marginBottom: 12 }}>{praise}</div>}
        <p style={{ opacity: 0.9 }}>Please your feedback would be considered as valuable. Kindly share your feedback <a href="sms:0549548274">here</a>. Thank you.</p>
        <p>You may also like <a href="#/digital_note">Digital Lesson Note</a></p>
      </div>
    </>
  );
};

export default Assessment;
