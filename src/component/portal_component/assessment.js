// Assessment.upgraded.optionB.js
import React, { useEffect, useMemo, useState } from "react";
import Breadcrumb from "../breadcrumb";
import Header from "../header";

/**
 * Assessment.upgraded.optionB.js
 *
 * - Dark mode (Option B): when component mounts it will set the document body
 *   colors according to darkMode. When the component unmounts (leaving the page),
 *   it restores the application's background to white and text color to a dark tint.
 *
 * - PIN: requested once per page load. Stored in sessionStorage ("mec_access_granted").
 *   No UI text or button shows PIN status. The PIN is lost on reload (sessionStorage).
 *
 * - All original sheetLinks preserved.
 *
 * CONFIG:
 * - PIN_CODE: change PIN here.
 * - PRIMARY_COLOR: change theme orange here.
 */

const PIN_CODE = "2025."; // change if needed
const PRIMARY_COLOR = "#ff6a00"; // orange primary

/* ============================
   sheetLinks (preserved from original upload)
   ============================ */
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
    "https://docs.google.com/spreadsheets/d/1H5C7gQJRqvZIh6779LTBjBAA3vPLOkFtAlx-4-7gjlY/edit",
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
  "https://docs.google.com/spreadsheets/d/1ylo07zX0Hy4YkJ9aPbbidNmluGNTGZJVsCCUte--5Rc/edit",
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
    "https://docs.google.com/spreadsheets/d/1dX_f8YWsVGzZ45hhf2oRiKzRC0fhaDprQEcU3gfCjY/edit",
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
    "https://docs.google.com/spreadsheets/d/1apTPBXRK6GhtfGsQIhZTyHNiKsVAAoamPGQ7xrWZw/edit",
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
  "Ga_KG 2":
    "https://docs.google.com/spreadsheets/d/1GFj_DtsAKBTycktCUGFpi7Zv2J7E8OAPywrBidg92Ow/edit",
  
  "RME_KG 2":
    "https://docs.google.com/spreadsheets/d/1vNVj0-cF_qINPJ8DH_8bAkK8WbZK7ecNVMdP0WqhHsg/edit",
  "Phonics_KG 2":
    "https://docs.google.com/spreadsheets/d/1m_6ZJ4xL3Kb6rti7Pq64fncx5-2jBpnV3JLc-i1QRvQ/edit",
  "Writing and Composition_KG 2":
    "https://docs.google.com/spreadsheets/d/1YL-djx7fdlT0Vvxaod84oGxe7L1oTz1G-7LWEoiePrg/edit",
  "Rhymes and Poems_KG 2":
    "https://docs.google.com/spreadsheets/d/1h2QMx8Wa1590O-Pcn_6gkdFe4fZugDwsB59KHmIu8rY/edit",
  "Reading and Comprehension_KG 2":
    "https://docs.google.com/spreadsheets/d/194Cy_TO3nrPhXEf7IMJ9CzW79imQBhZUjyKrzHDyOxk/edit",
  "French_KG 2":
    "https://docs.google.com/spreadsheets/d/1d2wab-G2F2o0CU3nvSv9vKt-4tqzDmskD13EDcVwj7c/edit",
  "Computing_KG 2":
    "https://docs.google.com/spreadsheets/d/1NLKi3DSG1kf420b8sVMfPoB6naN_HgGsqmye9OoTlvc/edit",
  "Creative Art_KG 2":
    "https://docs.google.com/spreadsheets/d/1NqEbFqW5EG3aRnOZwUoFQ5uwba3epameH2u-ztvcZ9g/edit",
  "History_KG 2":
    "https://docs.google.com/spreadsheets/d/1fWxTqD_LYZqBvmqWqVN7pdCzjvffk5yCGpaP5-OEi0s/edit",
  "Science_KG 2":
    "https://docs.google.com/spreadsheets/d/15lEOZxCHq4i3hQ7VqCKz79DqO6V0G2Db89G1398QhXA/edit",
  "Math_KG 2":
    "https://docs.google.com/spreadsheets/d/1_30LJ_EkkHMhMzSg3cfm4__Fd09umiCIMOjIFJaTuRo/edit",
"Health Safety_KG 2":
"https://docs.google.com/spreadsheets/d/1GLxmF6nQbH12UDcX91pBFAJE0K7i8PnGGKB8Zfb2ktc/edit",
  "English_KG 2":
    "https://docs.google.com/spreadsheets/d/150YfNNTpqLYR7liQDEGrejMZ_5-UUpAxNg7GJE0iDzU/edit"
};

/* ============================
   Component
   ============================ */
export default function Assessment() {
  // selection
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [sheetUrl, setSheetUrl] = useState("");

  // UI state
  const [activeTab, setActiveTab] = useState("assessment"); // assessment | quick | history | notifications
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("mec_darkmode") === "true");
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
  const [notificationMsg, setNotificationMsg] = useState("");
  const [praiseMsg, setPraiseMsg] = useState("");

  // classes & subjects
  const classes = useMemo(
    () => ["KG 2", "MEC 1", "MEC 2", "MEC 3", "MEC 4", "MEC 5", "MEC 6", "JHS 1", "JHS 2", "JHS 3"],
    []
  );
  const subjects = useMemo(
    () => [
      "Ga","Computing","Creative Art","Math","Science","History","Owop","French","Social",
      "English","Health Safety","Career Tech","RME","Library","Programme Activities",
      "Rhymes and Poems","Writing and Composition","Phonics","Reading and Comprehension"
    ],
    []
  );

  // persist dark mode locally (component remembers preference)
  useEffect(() => {
    localStorage.setItem("mec_darkmode", darkMode ? "true" : "false");
  }, [darkMode]);

  // persist history & pinned
  useEffect(() => {
    localStorage.setItem("mec_history", JSON.stringify(history));
  }, [history]);
  useEffect(() => {
    localStorage.setItem("mec_pinned", JSON.stringify(pinned));
  }, [pinned]);

  // on mount/unmount: manage body styles so dark mode affects only while component mounted (Option B).
  useEffect(() => {
    // apply current mode to body while component is mounted
    const applyBody = () => {
      if (darkMode) {
        document.body.style.background = "#071025";
        document.body.style.color = "#eaf3ff";
      } else {
        document.body.style.background = "#ffffff";
        document.body.style.color = "#14303d";
      }
    };

    applyBody();

    // when component unmounts restore webapp default (white + dark text)
    return () => {
      document.body.style.background = "#ffffff";
      document.body.style.color = "#14303d";
    };
    // We intentionally only depend on darkMode so toggles update body while mounted.
  }, [darkMode]);

  // helper: add history entry
  function addHistory(subject, cls, action) {
    const entry = {
      key: `${subject}_${cls}`,
      subject,
      class: cls,
      action,
      ts: new Date().toISOString()
    };
    setHistory((h) => [entry, ...h].slice(0, 200));
    setPraiseFromAction(action);
  }

  // helper: increment pinned
  function bumpPinned(key) {
    setPinned((p) => {
      const out = { ...p };
      out[key] = (out[key] || 0) + 1;
      return out;
    });
  }

  // praise generator
  function setPraiseFromAction(action) {
    const praisePool = {
      "Loaded Sheet": [
        "Sheet loaded — smooth job.",
        "Loaded successfully — keep it up."
      ],
      "Opened for Edit": [
        "Opened for edit — thanks for updating records.",
        "Editing — you're maintaining great records."
      ],
      "Quick Link Opened": [
        "Quick link used — nice workflow.",
        "Fast access — good move."
      ]
    };
    const pool = praisePool[action] || [
      "Nice — you're using the assessment tools effectively."
    ];
    const pick = pool[Math.floor(Math.random() * pool.length)];
    setPraiseMsg(pick);
    setTimeout(() => setPraiseMsg(""), 6000);
  }

  // Smart notifications logic
  function checkNotificationsForKey(key) {
    const relevant = history.find((h) => h.key === key);
    if (!relevant) {
      setNotificationMsg("You haven't opened this sheet before — good time to start keeping records.");
      return;
    }
    const days = Math.round((new Date() - new Date(relevant.ts)) / (1000 * 60 * 60 * 24));
    if (days >= 14) {
      setNotificationMsg(`It's been ${days} days since you last opened this. Consider reviewing progress.`);
    } else if (days >= 7) {
      setNotificationMsg(`You last opened this ${days} days ago. A quick check-in might help.`);
    } else {
      setNotificationMsg("");
    }
  }

  // session-based access: store once per page load
  function hasSessionAccess() {
    return sessionStorage.getItem("mec_access_granted") === "true";
  }
  function grantSessionAccess() {
    sessionStorage.setItem("mec_access_granted", "true");
  }

  // Access permission: if session has access, call load directly; else prompt once and store.
  function accessPermitThenLoad() {
    if (hasSessionAccess()) {
      handleLoad();
      return;
    }
    const prmp = window.prompt("Enter PIN to load sheets");
    if (prmp === PIN_CODE) {
      grantSessionAccess();
      handleLoad();
    } else {
      alert("Permission not granted — wrong PIN.");
    }
  }

  // Load sheet (embed)
  function handleLoad() {
    if (!selectedSubject || !selectedClass) {
      alert("Select Subject and Class first.");
      return;
    }
    const key = `${selectedSubject}_${selectedClass}`;
    const link = sheetLinks[key];
    if (!link) {
      alert("No Google Sheet found for this selection.");
      return;
    }
    const embedLink = link.replace("/edit", "/edit?usp=drivesdk");
    setSheetUrl(embedLink);

    addHistory(selectedSubject, selectedClass, "Loaded Sheet");
    bumpPinned(key);
    checkNotificationsForKey(key);
    setActiveTab("assessment");
  }

  // Edit in Google Sheet (open new window)
  function handleEdit() {
    if (!selectedSubject || !selectedClass) {
      alert("Select Subject and Class first.");
      return;
    }
    const key = `${selectedSubject}_${selectedClass}`;
    const link = sheetLinks[key];
    if (!link) {
      alert("No editable link found.");
      return;
    }
    const editLink = link.replace("/edit", "/edit?pli=1&authuser=0");
    window.open(editLink, "_blank");

    addHistory(selectedSubject, selectedClass, "Opened for Edit");
    bumpPinned(key);
    setActiveTab("assessment");
  }

  // Quick Links: top 6 pinned sorted
  const topPinned = useMemo(() => {
    return Object.entries(pinned)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([k, v]) => ({ key: k, subject: k.split("_")[0], class: k.split("_")[1], count: v }));
  }, [pinned]);

  // open quick link
  function openQuickLink(key) {
    const link = sheetLinks[key];
    if (!link) return alert("Sheet link missing.");
    const editLink = link.replace("/edit", "/edit?pli=1&authuser=0");
    window.open(editLink, "_blank");
    const [sub, cls] = key.split("_");
    addHistory(sub, cls, "Quick Link Opened");
    bumpPinned(key);
    setActiveTab("quick");
  }

  // remove history entry
  function removeHistoryEntry(idx) {
    setHistory((h) => h.filter((_, i) => i !== idx));
  }

  // clear notifications
  function clearNotifications() {
    setNotificationMsg("");
  }

  // clear pinned
  function clearPinned() {
    setPinned({});
  }

  // TabButton small component
  const TabButton = ({ id, label }) => (
    <button
      className={`tab-btn ${activeTab === id ? "active" : ""}`}
      onClick={() => setActiveTab(id)}
      style={{
        background: activeTab === id ? (darkMode ? `linear-gradient(90deg, rgba(0,0,0,0.3), rgba(0,0,0,0.18))` : `linear-gradient(90deg, rgba(255,240,230,1), rgba(255,238,230,1))`) : "transparent",
        color: activeTab === id ? (darkMode ? "#fff" : "#7e3700") : (darkMode ? "#f3d9c6" : "#663800")
      }}
      aria-pressed={activeTab === id}
    >
      {label}
    </button>
  );

  // CSS
  const styleTag = `
    :root {
      --accent: ${PRIMARY_COLOR};
      --accent-600: ${PRIMARY_COLOR};
      --glass-light: rgba(255,255,255,0.82);
      --glass-dark: rgba(10,18,30,0.55);
    }
    .mec-wrap { max-width: 1080px; margin: 22px auto; padding: 18px; }
    .glass { backdrop-filter: blur(8px) saturate(120%); -webkit-backdrop-filter: blur(8px) saturate(120%); border-radius: 14px; border: 1px solid rgba(0,0,0,0.06); box-shadow: 0 10px 30px rgba(10,10,10,0.08); }
    .glass-light { background: var(--glass-light); }
    .header-row { display:flex; justify-content:space-between; align-items:center; gap:12px; }
    .tabs { display:flex; gap:8px; margin-top:14px; flex-wrap:wrap; }
    .tab-btn { padding:10px 14px; border-radius:10px; border:none; cursor:pointer; font-weight:700; transition: all .18s ease; background:transparent; font-size:14px; }
    .tab-btn.active { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,0,0,0.08); }
    .panel { margin-top:18px; padding:16px; border-radius:12px; min-height:120px; }
    .grid-2 { display:grid; grid-template-columns: 1fr 360px; gap:18px; align-items:start; }
    .small { font-size:13px; opacity:0.88; }
    .ql-item { display:flex; justify-content:space-between; align-items:center; padding:12px; border-radius:12px; margin-bottom:10px; transition: transform .12s ease; }
    .ql-item:hover { transform: translateY(-4px); }
    .history-item { padding:12px; border-radius:12px; margin-bottom:10px; font-size:14px; display:flex; justify-content:space-between; align-items:center; gap:12px; }
    .notif { padding:12px; border-radius:12px; margin-bottom:10px; font-size:14px; }
    .btn-primary {
      background: linear-gradient(90deg, var(--accent), #ff944d);
      color: white;
      border:none;
      padding:10px 14px;
      border-radius:12px;
      cursor:pointer;
      font-weight:800;
      box-shadow: 0 10px 28px rgba(255,110,40,0.12);
    }
    .btn-ghost {
      background: transparent;
      border:1px solid rgba(0,0,0,0.06);
      color: inherit;
      padding:8px 12px;
      border-radius:10px;
      cursor:pointer;
    }
    .pro-banner { padding:10px 12px; border-radius:12px; display:flex; justify-content:space-between; align-items:center; gap:10px; }
    .fade-in { animation: fade .45s ease both; }
    .slide-up { animation: slideUp .35s cubic-bezier(.2,.9,.3,1) both; }
    @keyframes fade { from { opacity:0 } to { opacity:1 } }
    @keyframes slideUp { from { opacity:0; transform: translateY(6px) } to { opacity:1; transform: translateY(0) } }

    /* responsiveness */
    @media (max-width: 980px) {
      .grid-2 { grid-template-columns: 1fr; }
      .right-col { order: 2; }
    }
  `;

  // render
  return (
    <>
      <style>{styleTag}</style>
      <Breadcrumb title="Assessment" image="https://lh3.googleusercontent.com/pw/AP1GczMwG1XcntnevAvGkmEm56QCW7jHRMy12WGJ9YdG_Qg-TmI4D8rdHwKcBNNqx2WFdQOJYhZPzsZOlZoTqDdhw5HNYO19MAoO8mhyh2PFuTyJxAmLuSc"/>
      <Header />

            
      <div className="mec-wrap">
<iframe
  src="https://drive.google.com/file/d/1lx5injOT13hK9DBDt1eYZj5IP-nKcBPA/preview"
  allow="autoplay"
  style={{ width: "100%", height: "300px", border: "none" }}
></iframe>

<br /><br/>
        <div className={`glass ${!darkMode ? "glass-light" : ""} fade-in`}>
          <div className="header-row" style={{ padding: 14 }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 900, color: `var(--accent-600)` }}>Teacher Assessment</div>
              
            </div>

            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 12, opacity: 0.7 }}>Mode</div>
                <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                  <button
                    className="btn-ghost"
                    onClick={() => setDarkMode((d) => !d)}
                    aria-label="Toggle dark mode"
                    title="Toggle dark mode"
                  >
                    {darkMode ? "Light" : "Dark"}
                  </button>
                </div>
              </div>

            </div>
          </div>

          <div style={{ padding: "12px 12px 6px 12px" }} className="slide-up">
            <div className="tabs" role="tablist" aria-label="Assessment tabs">
              <TabButton id="assessment" label="Assessment Sheet" />
              <TabButton id="quick" label="Quick Links" />
              <TabButton id="history" label="History" />
              <TabButton id="notifications" label="Notifications" />
            </div>
          </div>

          <div style={{ padding: 14 }}>
            {/* ASSESSMENT */}
            {activeTab === "assessment" && (
              <div className="panel slide-up" style={{ background: darkMode ? "var(--glass-dark)" : "#fff" }}>
                <div className="grid-2">
                  <div>
                    <div style={{ fontWeight: 800, marginBottom: 10 }}>Open Google Sheet</div>

                    <label className="small" style={{ display: "block", marginBottom: 6 }}>Select Class</label>
                    <select
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                      style={{
                        width: "100%",
                        padding: 12,
                        borderRadius: 10,
                        border: "1px solid rgba(0,0,0,0.06)",
                        marginBottom: 12,
                        background: darkMode ? "#071827" : "#fff",
                        color: "inherit"
                      }}
                    >
                      <option value="">-- Choose Class --</option>
                      {classes.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>

                    <label className="small" style={{ display: "block", marginBottom: 6 }}>Select Subject</label>
                    <select
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      style={{
                        width: "100%",
                        padding: 12,
                        borderRadius: 10,
                        border: "1px solid rgba(0,0,0,0.06)",
                        marginBottom: 14,
                        background: darkMode ? "#071827" : "#fff",
                        color: "inherit"
                      }}
                    >
                      <option value="">-- Choose Subject --</option>
                      {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>

                    <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
                      <button className="btn-primary" onClick={accessPermitThenLoad}>Load Sheet</button>
                      <button
                        className="btn-ghost"
                        onClick={handleEdit}
                        style={{ border: "1px solid rgba(0,0,0,0.06)" }}
                      >
                        Edit in Sheet
                      </button>
                    </div>

                    {praiseMsg && (
                      <div style={{ marginTop: 12, padding: 12, borderRadius: 10, background: darkMode ? "rgba(40,60,30,0.18)" : "#fffaf0", color: darkMode ? "#cfe8c7" : "#6a3b06" }}>
                        <strong>✅ {praiseMsg}</strong>
                      </div>
                    )}

                    {sheetUrl && (
                      <div style={{ marginTop: 14 }}>
                        <div style={{ fontSize: 13, marginBottom: 8, opacity: 0.85 }}>Preview (embedded)</div>
                        <iframe
                          title="Google Sheet Preview"
                          src={sheetUrl}
                          width="100%"
                          height="520"
                          style={{ borderRadius: 12, border: "1px solid rgba(0,0,0,0.06)" }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Right column: quick pinned */}
                  <aside className="right-col">
                    <div style={{ padding: 14, borderRadius: 12, background: darkMode ? "rgba(8,12,18,0.6)" : "#fbfdff" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                        <div style={{ fontWeight: 800 }}>Pinned Quick Links</div>
                        <div className="small" style={{ opacity: 0.7 }}>Top used</div>
                      </div>

                      <div style={{ maxHeight: 320, overflow: "auto" }}>
                        {topPinned.length === 0 && <div className="small" style={{ opacity: 0.85 }}>No quick links yet — open sheets to create pins.</div>}
                        {topPinned.map((p) => (
                          <div key={p.key} className="ql-item" style={{ background: darkMode ? "rgba(255,255,255,0.02)" : "transparent" }}>
                            <div>
                              <div style={{ fontWeight: 800 }}>{p.subject} • {p.class}</div>
                              <div className="small" style={{ marginTop: 6 }}>{p.count} visits</div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                              <button
                                onClick={() => openQuickLink(p.key)}
                                style={{ padding: "8px 10px", borderRadius: 8, border: "none", background: `linear-gradient(90deg, ${PRIMARY_COLOR}, #ff944d)`, color: "white", cursor: "pointer" }}
                              >Open</button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                        <button className="btn-ghost" onClick={() => { clearPinned(); }}>Clear Pinned</button>
                        <button className="btn-ghost" onClick={() => setActiveTab("quick")}>Manage</button>
                      </div>
                    </div>
                  </aside>
                </div>
              </div>
            )}

            {/* QUICK LINKS */}
            {activeTab === "quick" && (
              <div className="panel slide-up" style={{ background: darkMode ? "var(--glass-dark)" : "#fff" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontWeight: 800 }}>Quick Links</div>
                  <div className="small" style={{ opacity: 0.8 }}>Most accessed class-subject pairs</div>
                </div>

                <div style={{ marginTop: 12 }}>
                  {topPinned.length === 0 && <div className="small">No pinned items yet. Open sheets to pin them automatically.</div>}
                  {topPinned.map((p) => (
                    <div key={p.key} className="ql-item glass" style={{ padding: 14 }}>
                      <div>
                        <div style={{ fontWeight: 800 }}>{p.subject} — {p.class}</div>
                        <div className="small" style={{ marginTop: 6 }}>{p.count} visits</div>
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => openQuickLink(p.key)} className="btn-primary">Open</button>
                        <button onClick={() => { setPinned((old) => { const o = { ...old }; delete o[p.key]; return o; }); }} className="btn-ghost">Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* HISTORY */}
            {activeTab === "history" && (
              <div className="panel slide-up" style={{ background: darkMode ? "var(--glass-dark)" : "#fff" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontWeight: 800 }}>Activity History</div>
                  <div className="small" style={{ opacity: 0.8 }}>{history.length} records</div>
                </div>

                <div style={{ marginTop: 12 }}>
                  {history.length === 0 && <div className="small">No actions yet. Load or edit a sheet to start building history.</div>}
                  {history.map((h, idx) => (
                    <div key={idx} className="history-item" style={{ background: darkMode ? "rgba(255,255,255,0.02)" : "#fbfbfb" }}>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ fontWeight: 800 }}>{h.action}</div>
                        <div className="small" style={{ marginTop: 6 }}>{h.subject} • {h.class}</div>
                      </div>
                      <div style={{ textAlign: "right", minWidth: 140 }}>
                        <div className="small">{new Date(h.ts).toLocaleString()}</div>
                        <div style={{ marginTop: 8, display: "flex", gap: 8, justifyContent: "flex-end" }}>
                          <button
                            className="btn-ghost"
                            onClick={() => {
                              const link = sheetLinks[h.key];
                              if (link) {
                                setSheetUrl(link.replace("/edit", "/edit?usp=drivesdk"));
                                addHistory(h.subject, h.class, "Loaded Sheet");
                                bumpPinned(h.key);
                                setActiveTab("assessment");
                              } else alert("Link missing.");
                            }}
                          >
                            Open
                          </button>
                          <button
                            className="btn-ghost"
                            onClick={() => removeHistoryEntry(idx)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* NOTIFICATIONS */}
            {activeTab === "notifications" && (
              <div className="panel slide-up" style={{ background: darkMode ? "var(--glass-dark)" : "#fff" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontWeight: 800 }}>Smart Notifications</div>
                  <div className="small" style={{ opacity: 0.8 }}>Based on recent activity</div>
                </div>

                <div style={{ marginTop: 12 }}>
                  {notificationMsg ? (
                    <div className="notif glass" style={{ padding: 12 }}>
                      <div style={{ fontWeight: 800 }}>Reminder</div>
                      <div className="small" style={{ marginTop: 6 }}>{notificationMsg}</div>
                      <div style={{ marginTop: 8 }}>
                        <button className="btn-ghost" onClick={clearNotifications}>Dismiss</button>
                      </div>
                    </div>
                  ) : (
                    <div className="small">No urgent reminders — you're all caught up.</div>
                  )}

                  <div style={{ marginTop: 12 }}>
                    <div style={{ fontWeight: 800, marginBottom: 8 }}>Recent Activity</div>
                    {history.slice(0, 8).map((h, i) => (
                      <div key={i} className="notif" style={{ background: darkMode ? "rgba(255,255,255,0.02)" : "#fbfbfb", padding: 12, borderRadius: 10, marginBottom: 8 }}>
                        <div style={{ fontWeight: 700 }}>{h.action}</div>
                        <div className="small" style={{ marginTop: 6 }}>{h.subject} • {h.class} • {new Date(h.ts).toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>

        {/* small footer / links */}
        <div style={{ marginTop: 16, maxWidth: 1080, marginLeft: "auto", marginRight: "auto", display: "flex", justifyContent: "space-between", gap: 12 }}>
          <div style={{ fontSize: 13, opacity: 0.85 }}>
            Please your feedback would be considered as valuable. Kindly share your feedback <a href="sms:0549548274">here</a>.
          </div>
          <div style={{ fontSize: 13, opacity: 0.75 }}>
            <a href="#/digital_note">Digital Lesson Note</a>
          </div>
        </div>
      </div>
    </>
  );
}