import ScrollToTop from "react-scroll-to-top";
import Header from "./header";

function SearchAbbrev() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInputs");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
  

    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      } 
    }
  }
export default function ComputingAbbrev(){
    return(
        <>
      
<Header />
 <br/>
 <br/>
 <br/>
 <br/>
<div>
<center>
<input type="text" id="myInputs" onKeyUp={SearchAbbrev} placeholder="Search abbrev. here..." style={{padding:"10px 12px",width:"70%",borderRadius:"20px"}} />

</center>
<br/>
<br/>
<br/>
<div style={{paddingLeft:"20px",paddingRight:"20px"}}>
<table id="myTable" className="table table-borderless scrolltable">
                    <thead>
                      <tr>
                        <th>Abbrev.</th>
                        <th>Meaning</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                
 <tr>
  <td>AAA</td>
  <td>Authentication Authorization, and accounting</td>
</tr>

<tr>
  <td>AAL</td>
  <td>ATM adaptation Layer</td>
</tr>

<tr>
  <td>AARP</td>
  <td>Apple-Talk Address Resolution Protocol</td>
</tr>

<tr>
  <td>AAS</td>
  <td>Auto Area Segmentation</td>
</tr>

<tr>
  <td>AAT</td>
  <td>Average Access Time</td>
</tr>

<tr>
  <td>ABAP</td>
  <td>Advanced Business Application Programming</td>
</tr>

<tr>
  <td>ABI</td>
  <td>Application Binary Interface</td>
</tr>

<tr>
  <td>ABR</td>
  <td>Available Bit Rate</td>
</tr>

<tr>
  <td>ACAP</td>
  <td>Application Configuration Access Protocol</td>
</tr>

<tr>
  <td>ACDI</td>
  <td>Asynchronous Communication Device Interface</td>
</tr>

<tr>
  <td>ACF</td>
  <td>Advanced Communication Function</td>
</tr>

<tr>
  <td>ACI</td>
  <td>Access Control Information</td>
</tr>
  <tr>
    <td>ACID</td>
  <td>
  Atomicity,Consistency,Isolation,Durability</td>
</tr>

<tr>
  <td>ACL</td>
  <td>Access Control List</td>
</tr>

<tr>
  <td>ACM</td>
  <td>Access Control List</td>
</tr>

<tr>
  <td>ACMS</td>
  <td>Application Control and Management System</td>
</tr>

<tr>
  <td>ACP</td>
  <td>Array Control Processor</td>
</tr>

<tr>
  <td>ACPI</td>
  <td>Advanced Configuration and Power Interface</td>
</tr>

<tr>
  <td>ACRI</td>
  <td>additional coding-related required information</td>
</tr>

<tr>
  <td>ACROSS</td>
  <td>Automated Cargo Release and Operations Service System</td>
</tr>

<tr>
  <td>ACT</td>
  <td>Access Control template</td>
</tr>

<tr>
  <td>ACU</td>
  <td>Abstract Code Unit</td>
</tr>

<tr>
  <td>ADB</td>
  <td>Apple Desktop Bus</td>
</tr>

<tr>
  <td>ADF</td>
  <td>Automatic Document Feeder</td>
</tr>

<tr>
  <td>admin</td>
  <td>ADMINISTRATOR</td>
</tr>

<tr>
  <td>ADI</td>
  <td>Application Desktop Integrator</td>
</tr>

<tr>
  <td>ADK</td>
  <td>Addiitional Decryption Key</td>
</tr>

<tr>
  <td>ADL</td>
  <td>Advanced Distributed Learning</td>
</tr>

<tr>
  <td>ADM</td>
  <td>Application Data Management</td>
</tr>

<tr>
  <td>ADMD</td>
  <td>Administra(tion/tive) Management Domain</td>
</tr>

<tr>
  <td>ADN</td>
  <td>Application Delivery Networking</td>
</tr>

<tr>
  <td>ADSI</td>
  <td>Active Directory Services Interface</td>
</tr>

<tr>
  <td id="adsl">ADSL</td>
  <td>Asymmetric Digital Subscriber Line</td>
</tr>

<tr>
  <td>AFM</td>
  <td>Atomic Force Microscope</td>
</tr>

<tr>
<td>AFP</td>
  <td>Apple Filling Protocol</td>
</tr>

<tr>
  <td>AFL</td>
  <td>Academic Free License</td>
</tr>

<tr>
  <td>AGC</td>
  <td>Automatic Gain Control</td>
</tr>

<tr>
<td>AGP</td>
  <td>Accelerated Graphics Port</td>
</tr>

<tr>
  <td>AHCI</td>
  <td>Advanced Host Controller Interface</td>
</tr>

<tr>
  <td>AHP</td>
  <td>Analytical Hierarchy Process</td>
</tr>

<tr>
  <td>AIA</td>
  <td>Application Integration Architecture</td>
</tr>

<tr>
  <td>AID</td>
  <td>Attention Identifier</td>
</tr>

<tr>
<td>AIFF</td>
  <td>Audio Interchange File Format</td>
</tr>

<tr>
  <td>AIN</td>
  <td>Advanced Intelligent Network</td>
</tr>

<tr>
  <td>AIO</td>
  <td>all in one</td>
</tr>

<tr>
  <td>AIOD</td>
  <td>Automatic Identified Outward Dialing</td>
</tr>

<tr>
  <td>AIR</td>
  <td>Additive Increase Rate</td>
</tr>

<tr>
<td>AIX</td>
  <td>Advanced Interactive Executive</td>
</tr>

<tr>
  <td>Ajax</td>
  <td>Asynchronous JavaScript and XML</td>
</tr>

<tr>
  <td>AJP</td>
  <td>Apache JServ Protocol</td>
</tr>

<tr>
  <td>ALI</td>
  <td>Application Layer Interface</td>
</tr>

<tr>
  <td>ALP</td>
  <td>Application Layer Program/Protocol</td>
</tr>

<tr>
  <td>ALSA</td>
  <td>Advanced Linux Sound Architecture</td>
</tr>

<tr>
<td>ALU</td>
  <td>Arithmetric logic Unit</td>
</tr>

<tr>
  <td>AMA</td>
  <td>automatic message accounting</td>
</tr>

<tr>
  <td>AMD</td>
  <td>Advanced Micro Devices</td>
</tr>

<tr>
  <td>AME</td>
  <td>Advanced Metal Evaporated</td>
</tr>

<tr>
  <td>AMI</td>
  <td>Application Messaging Interface</td>
</tr>

<tr>
  <td>AML</td>
  <td>Astronomical Markup Language</td>
</tr>

<tr>
  <td>AMS</td>
  <td>Application Management Services</td>
</tr>

<tr>
<td>ANR</td>
  <td>Application Not Responding</td>
</tr>

<tr>
<td>ANSI</td>
  <td>American National Standards Institute</td>
</tr>

<tr>
  <td>ANX</td>
  <td>Automative Network Exchange</td>
</tr>

<tr>
<td>API</td>
  <td>Application Programming Interface</td>
</tr>

<tr>
<td>APM</td>
  <td>Action Per Minute</td>
</tr>

<tr>
  <td>APM</td>
  <td>Advanced Power Management</td>
</tr>

<tr>
<td>APU</td>
  <td>Accelerated Processing Unit</td>
</tr>

<tr>
<td>ARP</td>
  <td>Address Resolution Protocol</td>
</tr>

<tr>
  <td>ART</td>
  <td>Additional Reference Transmission</td>
</tr>

<tr>
<td>ASCII</td>
  <td>American Standard Code for Information Interchange</td>
</tr>

<tr>
  <td>ASCL</td>
  <td>Asianet Satellite Communications Limited</td>
</tr>

<tr>
  <td>ASF</td>
  <td>Automatic Sheet Feeder</td>
</tr>

<tr>
<td>ASO</td>
  <td>App Store Optimization</td>
</tr>

<tr>
  <td>ASML</td>
  <td>Advanced Semiconductor Materials</td>
</tr>

<tr>
<td>ASP</td>
  <td>Active Server Page or Application Service Provider</td>
</tr>

<tr>
  <td>ASPI</td>
  <td>Advanced SCSI Programming Interface</td>
</tr>

<tr>
  <td>ASPX</td>
  <td>Active Server Pages Extended</td>
</tr>

<tr>
  <td>ASQ</td>
  <td>Automated Software Quality</td>
</tr>

<tr>
<td>ASVL</td>
  <td>Asvan-Launcher</td>
</tr>

<tr>
  <td>AT</td>
  <td>Advanced Technology</td>
</tr>

<tr>
<td>ATA</td>
  <td>Advanced Technology Attachment</td>
</tr>

<tr>
  <td>ATM</td>
  <td>Automated Teller Machine</td>
</tr>

<tr>
  <td>ATX</td>
  <td>Advanced Technology Extended</td>
</tr>

<tr>
  <td>AUDIT</td>
  <td>Automated Data Input Terminal</td>
</tr>

<tr>
  <td>AUI</td>
  <td>Attachment Unit Interface</td>
</tr>

<tr>
  <td>AUX</td>
  <td>auxilliary device</td>
</tr>

<tr>
  <td>AV</td>
  <td>Audio Video/Visual</td>
</tr>

<tr>
<td>AVR</td>
  <td>Audio/Video Receiver</td>
</tr>

<tr>
  <td>AVS</td>
  <td>Application Visualisation System</td>
</tr>

<tr>
<td>BASIC</td>
  <td>Beginner's All-purpose Symbolic Instruction Code</td>
</tr>

<tr>
  <td>BBC</td>
  <td>British Broadcasting Corporation</td>
</tr>

<tr>
<td>BCC</td>
  <td>Blind Carbon Copy</td>
</tr>

<tr>
  <td>BCD</td>
  <td>binary-coded decimal</td>
</tr>

<tr>
  <td>BCS</td>
  <td>Basic Content Services</td>
</tr>

<tr>
  <td>BD</td>
  <td>Blu-ray Disc</td>
</tr>

<tr>
  <td>BDC</td>
  <td>Backup Domain Controller</td>
</tr>

<tr>
  <td>BEEP</td>
  <td>Blocks Extensible Exchange Protocol</td>
</tr>

<tr>
  <td>BER</td>
  <td>bit error rate</td>
</tr>

<tr>
  <td>BFT</td>
  <td>Binary File Transfer</td>
</tr>

<tr>
  <td>BGI</td>
  <td>Binary Gateway Interface</td>
</tr>

<tr>
  <td>BGAN</td>
  <td>Broadband Global Area Network</td>
</tr>

<tr>
  <td>BGP</td>
  <td>Border Gateway Protocol</td>
</tr>

<tr>
  <td>BHLI</td>
  <td>Broadband High Layer Information</td>
</tr>

<tr>
  <td>BHO</td>
  <td>Browser Help Object</td>
</tr>

<tr>
  <td>BI</td>
  <td>BUsiness Intelligence</td>
</tr>

<tr>
  <td>BIA</td>
  <td>Business Impact Analysis</td>
</tr>

<tr>
  <td>BIBOP</td>
  <td>big bag of pages</td>
</tr>

<tr>
  <td>BIC</td>
  <td>bank identifier code</td>
</tr>

<tr>
  <td>BICI</td>
  <td>Broadband Inter-Carrier Interface</td>
</tr>

<tr>
  <td>BIDS</td>
  <td>Business Intelligence Development Studio</td>
</tr>

<tr>
<td id="bios1">BIOS</td>
  <td>Basic Input/Output System</td>
</tr>

<tr>
  <td>BIPS</td>
  <td>Bank Internet Payment System</td>
</tr>

<tr>
  <td>BIST</td>
  <td>built-in self test</td>
</tr>

<tr>
  <td>Bit</td>
  <td>Binary Digit</td>
</tr>

<tr>
  <td>BJT</td>
  <td>Bipolar Junction Transistor</td>
</tr>

<tr>
  <td>BLISS</td>
  <td>Broadband Local Integrated Services Solution</td>
</tr>

<tr>
  <td>BNI</td>
  <td>Broadband Network Interface</td>
</tr>

<tr>
<td>BMP</td>
  <td>Bitmap</td>
</tr>

<tr>
  <td>BPA</td>
  <td>Business Process Automation</td>
</tr>

<tr>
  <td>bpi</td>
  <td>bits per inch</td>
</tr>

<tr>
  <td>BPL</td>
  <td>Broadband over Power Lines</td>
</tr>

<tr>
  <td>BPM</td>
  <td>Business Process Management</td>
</tr>

<tr>
  <td>bps</td>
  <td>Bits Per Second</td>
</tr>

<tr>
  <td>BPV</td>
  <td>BiPolor Violation</td>
</tr>

<tr>
  <td>BRA</td>
  <td>Basic Rate Access</td>
</tr>

<tr>
  <td>BRAN</td>
  <td>Broadband Radio Access Networks</td>
</tr>

<tr>
  <td>BRAS</td>
  <td>Broadband Remote Access Server </td>
</tr>

<tr>
  <td>BRE</td>
  <td>Business Rule Engines</td>
</tr>

<tr>
  <td>BRI</td>
  <td>Basic Rate Interface</td>
</tr>

<tr>
  <td>BSA</td>
  <td>Business Software Alliance </td>
</tr>

<tr>
  <td>BSC</td>
  <td>Binary Synchronous Communication</td>
</tr>

<tr>
  <td>BSE</td>
  <td>Basic Service Elements</td>
</tr>

<tr>
  <td>BSM</td>
  <td>Business Service Management</td>
</tr>

<tr>
  <td>BSP</td>
  <td>Board Support Package</td>
</tr>

<tr>
  <td>BSSID</td>
  <td>Basic Service Set Identifier</td>
</tr>

<tr>
  <td>BST</td>
  <td>Binary Search Tree</td>
</tr>

<tr>
  <td>BTAG</td>
  <td>Beginning Tag</td>
</tr>

<tr>
  <td>BTO</td>
  <td>Business Technology Optimization</td>
</tr>

<tr>
  <td>BTM</td>
  <td>Business Transaction Monitoring</td>
</tr>

<tr>
  <td>BTS</td>
  <td>Bits Per Second</td>
</tr>

<tr>
  <td>BTX</td>
  <td>Balanced Technology Extended</td>
</tr>

<tr>
  <td>BUS</td>
  <td>Broadcast and Unknown Server</td>
</tr>

<tr>
  <td>BVD</td>
  <td>Basic Virtual Disk</td>
</tr>

<tr>
<td>CAD</td>
  <td>Computer-Aided Design</td>
</tr>

<tr>
  <td>C2A</td>
  <td>Click-to-Action</td>
</tr>

<tr>
  <td>CAL</td>
  <td>Client Access License</td>
</tr>

<tr>
  <td>CAMEL</td>
  <td>Customized Application for Mobile Networks Enhanced Logic</td>
</tr>

<tr>
<td>CAN</td>
  <td>Campus Area Network</td>
</tr>

<tr>
  <td>CAPI</td>
  <td>Computer Assisted Personal Interviews</td>
  </tr>

  <tr>
  <td>CARE</td>
  <td>Customer Account Record Exchange</td>
</tr>

<tr>
<td>CBN</td>
  <td>Common Bonding Network </td>
</tr>

<tr>
<td>CBQ</td>
  <td>Class-Based Queuing</td>
</tr>

<tr>
<td>CBT</td>
  <td>Computer Based Training</td>
</tr>

<tr>
<td>CBWFQ</td>
  <td>Class-Based Weighted Fair Queueing</td>
</tr>

<tr>
<td>Cc</td>
  <td>Carbon Copy</td>
</tr>

<tr>
<td>CCC</td>
  <td>Clear Channel Capability</td>
</tr>

<tr>
<td>CCD</td>
  <td>Charged Coupled Device</td>
</tr>

<tr>
<td>CCIE</td>
  <td>Cisco Certified Internetwork Expert</td>
</tr>

<tr>
<td>CCL</td>
  <td>Communication Control Language</td>
</tr>

<tr>
<td>CCNA</td>
  <td>Cisco Certified Network Assocaite </td>
</tr>

<tr>
<td>CCP</td>
<td>Certified Computer Professionals</td>
</tr>

<tr>
<td>CCTV</td>
<td>Closed-Circuit Television</td>
</tr>

<tr>
<td>CD</td>
  <td>Compact Disc</td>
</tr>

<tr>
<td>CDB</td>
<td>Capacity Database</td>
</tr>

<tr>
<td>CDDI</td>
<td>Copper Distributed Data Interface</td>
</tr>

<tr>
<td>CDE</td>
<td>Common Desktop Environment</td>
</tr>

<tr>
<td>CD-R</td>
  <td>Compact Disc Recordable</td>
</tr>

<tr>
<td>CD-ROM</td>
  <td>Compact Disc Read Only Memory</td>
</tr>

<tr>
<td>CD-RW</td>
  <td>Copact Disk Re-Writable</td>
</tr>

<tr>
<td>CDFS</td>
  <td>Compact Disc File System</td>
</tr>

<tr>
<td>CDH</td>
<td>Customer Data Hub</td>
</tr>

<tr>
<td>CDI</td>
<td>Customer Data Integration</td>
</tr>

<tr>
<td>CDMA</td>
  <td>Code division multiple access</td>
</tr>

<tr>
<td>CDN</td>
  <td>Content Delivery Network</td>
</tr>

<tr>
<td>CDO</td>
<td>Care Delivery Organization</td>
</tr>

<tr>
<td>CDS</td>
<td>Correlated Double Sampling</td>
</tr>

<tr>
<td>CDV</td>
<td>Cell Delay Variation</td>
</tr>

<tr>
<td>CEA</td>
<td>Consumer Electronics Association</td>
</tr>

<tr id="cec">
  <td>CEC</td>
  <td>Consumer Electronics Control</td>
</tr>

<tr>
<td>CEF</td>
<td>Character Encoding Form</td>
</tr>

<tr>
<td>CEH</td>
<td>Certified Ethical Hacker </td>
</tr>

<tr>
<td>CEM</td>
<td>Customer Experience Management</td>
</tr>

<tr>
<td>CEMF</td>
<td>Cisco Element Management Framework</td>
</tr>

<tr>
<td>CER</td>
<td>Corporate Error Reporting</td>
</tr>

<tr>
<td>CF</td>
<td>Compact Flash</td>
</tr>

<tr>
<td>CG</td>
<td>Computer Graphics</td>
</tr>

<tr>
<td>CGA</td>
<td>Colour Graphics Adaptor</td>
</tr>

<tr>
<td>CGI</td>
<td>Common Gateway Interface</td>
</tr>

<tr>
<td>CGM</td>
<td>Consumer-generated media</td>
</tr>

<tr>
<td>Charset</td>
<td>character set</td>
</tr>

<tr>
<td>chat</td>
<td>Conversational Hypertext Access Technology</td>
</tr>

<tr>
<td>ChR</td>
<td>channel reliability</td>
</tr>

<tr>
<td>cHTML</td>
<td>Compact Hypertext Markup Language </td>
</tr>

<tr>
<td>CIA</td>
<td>Confidentiality,integrity,and availability</td>
</tr>

<tr>
<td>CICS</td>
<td>Customer Information Control System</td>
</tr>

<tr>
<td>CIDR</td>
  <td>Classless Inter-Domain Routing</td>
</tr> 
<tr>
<td>CIFS</td>
<td>Common Internet File System</td>
</tr>

<tr>
<td>CIK</td>
<td>crypto-ignition key</td>
</tr>

<tr>
<td>CIM</td>
<td>Computer Integrated Manufacturing</td>
</tr>

<tr>
<td>CISC</td>
  <td>Complex Instruction Set Computing</td>
</tr>

<tr>
<td>CISO</td>
<td>chief information security officer</td>
</tr>

<tr>
<td>CIX</td>
<td>Commercial Internet Exchange</td>
</tr>

<tr>
<td>CLASS</td>
<td>Custom Local Area Signaling Services</td>
</tr>

<tr>
<td>CLEC</td>
<td>Competitive Local Exchange Carrier</td>
</tr>

<tr>
<td id="cmos1">CMOS</td>
  <td>Complementary Metal Oxide Semiconductor</td>
</tr>

<tr>
<td>CMYK</td>
  <td>Cyan Magenta Yellow Black</td>
</tr>

<tr>
<td>CNA</td>
<td>Converged Network Adapter</td>
</tr>

<tr>
<td>CNAM</td>
<td>Caller ID With Name</td>
</tr>

<tr>
<td>CNE</td>
<td>Certified Novell/Network Engineer</td>
</tr>

<tr>
<td>CO</td>
<td>Central Office</td>
</tr>

<tr>
<td>CoA</td>
<td>Care of Address</td>
</tr>

<tr>
<td>coax</td>
<td>coaxial(cable)</td>
</tr>

<tr>
<td>COBIT</td>
<td>Control Objectives for Information and related Technologies</td>
</tr>

<tr>
<td>COIN</td>
<td>Community OF Interest Network</td>
</tr>

<tr>
<td>CORE</td>
<td>Compare Operational Readiness Evaluation</td>
</tr>

<tr>
<td>CORS</td>
<td>Continuously Operating Reference Station</td>
</tr>

<tr>
<td>COS</td>
<td>Cloud Optimized Storage</td>
</tr>

<tr>
<td>CPA</td>
  <td>Cost Per Action</td>
</tr>

<tr>
<td>CPAN</td>
<td>Comprehensive Perl Archive Network</td>
</tr>

<tr>
<td>cPanel</td>
<td>control panel</td>
</tr>

<tr>
<td>CPE</td>
<td>customer premises equipment</td>
</tr>

<tr>
<td>CPF</td>
<td>Cloud Provisioning Fabric</td>
</tr>

<tr>
<td>cpi</td>
<td>characters per inch</td>
</tr>

<tr>
<td>CPLD</td>
<td>Complex Programmable Logic Device</td>
</tr>

<tr>
<td>CPM</td>
  <td>Cost Per 1,000 Impressions</td>
</tr>

<tr>
<td>CPN</td>
<td>calling party number</td>
</tr>

<tr>
<td>CPNI</td>
<td>Customer Proprietary Network Information</td>
</tr>

<tr>
<td>CPOE</td>
<td>Computerized Provider Order Entry</td>
</tr>

<tr>
<td>CPRM</td>
<td>Content Protection for Removable Media</td>
</tr>

<tr>
<td>cps</td>
<td>Characters Per Second</td>
</tr>

<tr>
<td>CPS</td>
<td>Continuous Protection Server</td>
</tr>

<tr>
<td>CPU</td>
  <td>Central Processing Unit</td>
</tr>

<tr>
<td>CRACK</td>
  <td>Challenge/Response Authentication of Cryptographic Key</td>
</tr>

<tr>
<td>CRC</td>
  <td>Cyclic Redundancy Check</td>
</tr>

<tr>
<td>CRL</td>
  <td>certificate revocation list</td>
</tr>

<tr>
<td>CRLF</td>
  <td>carriage return, line feed</td>
</tr>

<tr>
<td>CRM</td>
  <td>Customer Relationship Management</td>
</tr>

<tr>
<td>CRMB</td>
  <td>Customer Reference Material Database</td>
</tr>

<tr>
<td>cROI</td>
  <td>companywide ROI</td>
</tr>

<tr>
<td>CRR</td>
  <td>Continuous Remote Replication</td>
</tr>

<tr>
<td id="crt">CRT</td>
  <td>Cathode Ray Tube</td>
</tr>

<tr>
<td>CRUD</td>
  <td>Create, Read, Update, Delete</td>
</tr>
  <tr>
<td>crypto</td>
  <td>Cryptography</td>
</tr>

<tr>
<td>CSCF</td>
  <td>call session control function</td>
</tr>

<tr>
<td>CSCW</td>
  <td>computer supported co-operative work</td>
</tr>

<tr>
 
<td>CSD</td>
  <td>Cisco Secure Desktop</td>
</tr>

<tr>
 
<td>CSE</td>
  <td>custom search engine</td>
</tr>

<tr>
 
<td>Csel</td>
  <td>Cable Select</td>
</tr>

<tr>
 
<td>CSFs</td>
  <td>critical success factors</td>
</tr>

<tr>
 
<td>CSG</td>
  <td>Communications Services Group</td>
</tr>

<tr>
 
<td>CSMA/CA</td>
  <td>Carrier Sense Multiple Access/Collision Avoidance</td>
</tr>

<tr>
 
<td>CSMA/CD</td>
  <td>Carrier Sense Multiple Access with Collision Detection</td>
</tr>

<tr>
 
<td>CSO</td>
  <td>Cold Start Only</td>
</tr>

<tr>
 
<td>CSP</td>
  <td>Communications service providers</td>
</tr>

<tr>
<td>CSS</td>
  <td>Cascading Style Sheet</td>
</tr>
<tr> 
<td>CSS-P</td>
  <td>cascading style sheet positioning</td>
</tr>
<tr> 
<td>CST</td>
  <td>Consolidated Service Test</td>
</tr>
<tr> 
<td>CSW</td>
  <td>channel status word</td>
</tr>
<tr> 
<td>CTCp</td>
  <td>Client-To-Client-Protoco</td>
</tr>
<tr> 
<td>CTD</td>
  <td>Cell Transfer Delay</td>
</tr>
<tr> 
<td>CTI</td>
  <td>computer-telephony integration</td>
</tr>
<tr> 
<td>CTO</td>
  <td>chief technology officer</td>
</tr>
<tr> 
<td>CTP</td>
  <td>capable to promise</td>
</tr>
<tr> 
<td>CTR</td>
  <td>Click-Through Rate</td>
</tr>
<tr> 
<td>ctrl</td>
  <td>control</td>
</tr>
<tr> 
<td>CTT</td>
  <td>China Tietong Telecommunications</td>
</tr>
<tr> 
<td>CTX</td>
  <td>Commited to Excellence</td>
</tr>

<tr>
<td>CUDA</td>
  <td>Compute Unified Device Architecture</td>
</tr>
<tr> 
<td>CUG</td>
  <td>closed user group</td>
</tr>
<tr> 
<td>CUoD</td>
  <td>Capacity Upgrade on Demand</td>
</tr>
<tr> 
<td>CUPS</td>
  <td>Common Unix Printing System</td>
</tr>
<tr> 
<td>CVP</td>
  <td>Content Vectoring Protocol</td>
</tr>
<tr> 
<td>CVSD</td>
  <td>Continuous Variable Slope Delta modulation</td>
</tr>
<tr> 
<td>CYMK</td>
  <td>cyan, magenta, yellow, black</td>
</tr>

<tr>
<td>DAW</td>
  <td>Digital Audio Workstation</td>
</tr>

<tr>
<td>DBL</td>
  <td>Dorby-Launch</td>
</tr>

<tr>
<td>DBMS</td>
  <td>Database Management System</td>
</tr>

<tr>
  <td id="dp">DP</td>
  <td>Display Port</td>
</tr>

<tr>
<td>DPCP</td>
  <td>DisplayPort Content Protection</td>
</tr>

<tr>
<td>DCIM</td>
  <td>Digital Camera Images</td>
</tr>

<tr>
<td>DDL</td>
  <td>Data Definition Language</td>
</tr>

<tr>
<td>DDR</td>
  <td>Double Data Rate</td>
</tr>

<tr>
<td>DFS</td>
  <td>Distributed File System</td>
</tr>

<tr>
<td>DFS</td>
  <td>Dynamic Frequency Selection</td>
</tr>

<tr>
<td>DHCP</td>
  <td>Dynamic Host Configuration Protocol</td>
</tr>

<tr>
<td>DIMM</td>
  <td>Dual in-Line Memory module</td>
</tr>

<tr>
<td>DKIM</td>
  <td>DomainKeys Identified Mail</td>
</tr>

<tr>
<td>DLC</td>
  <td>Downloadable Content</td>
</tr>

<tr>
<td>DMA</td>
  <td>Direct Memory Access</td>
</tr>

<tr>
<td>DNS</td>
  <td>Domain Name System</td>
</tr>

<tr>
<td>DOD</td>
  <td>Department of Defense</td>
</tr>

<tr>
<td>DOS</td>
  <td>Disk Operating System</td>
</tr>

<tr>
<td>DPI</td>
  <td>Dot Per Inch</td>
</tr>

<tr>
<td>DRAM</td>
  <td>Dynamic Random Access Memory</td>
</tr>

<tr>
<td>DRM</td>
  <td>Digital Rights Management</td>
</tr>

<tr>
<td>DSL</td>
  <td>Digital Subscriber Line</td>
</tr>

<tr>
<td>DSLAM</td>
  <td>Digital Subscriber Line Access Multiplexer</td>
</tr>

<tr>
<td>DSSS</td>
  <td>Direct-Sequence Spread Spectrum</td>
</tr>

<tr>
<td>DTD</td>
  <td>Document Type Definition</td>
</tr>

<tr>
<td>DV</td>
  <td>Digital Video</td>
</tr>

<tr>
<td id="dvd">DVD</td>
  <td>Digital Versatile Disc</td>
</tr>

<tr>
<td>DVD &plus;R </td>
  <td>Digital Versatile Disc Recordable</td>
</tr>

<tr>
<td>DVD &plus;RW</td>
  <td>Digital Versatile Disc Rewritable</td>
</tr>

<tr>
<td>DVD-R</td>
  <td>Digital Versatile Disc Recordable</td>
</tr>

<tr>
<td>DVD-RAM</td>
  <td>Digital Versatile Disc Random Access Memory</td>
</tr>

<tr>
<td id="dvi">DVI</td>
  <td>Digital Video Interface</td>
</tr>

<tr>
<td>DVR</td>
  <td>Digital Video Recorder</td>
</tr>

<tr>
<td>ECC</td>
  <td>Error Correction Code</td>
</tr>

<tr>
<td>ECM</td>
  <td>Enterprise Content Management</td>
</tr>

<tr>
<td>ECMA</td>
  <td>European Computer Manufacturers Association</td>
</tr>

<tr>
<td>ECMP</td>
  <td>Equal Cost Multipath Routing</td>
</tr>

<tr>
<td>ECS</td>
  <td>Extended Character Set</td>
</tr>

<tr>
<td>EDI</td>
  <td>Electronic Data Interchange</td>
</tr>

<tr>
<td>EDO</td>
  <td>Extended Data Output</td>
</tr>

<tr>
<td>EDS</td>
  <td>Electronic Data Systems</td>
</tr>

<tr>
<td>EEPROM</td>
  <td>Electrical Erasable Programmable Read Only Memory</td>
</tr>

<tr>
<td>EFI</td>
  <td>Extensible Firmware Interface</td>
</tr>

<tr>
<td>EGP</td>
  <td>Exterior Gateway Protocol</td>
</tr>

<tr>
<td>EHA</td>
  <td>Ethernet Hardware Address</td>
</tr>

<tr>
<td>ELAN</td>
  <td>Emulated Local Area Network</td>
</tr>

<tr>
<td>EMI</td>
  <td>Electromagnetic Interferance</td>
</tr>

<tr>
<td>EMR</td>
  <td>Electronic Medical Record</td>
</tr>

<tr>
<td>ENQ</td>
  <td>Enquiry</td>
</tr>

<tr>
<td>ENX</td>
  <td>European Network Exchange</td>
</tr>

<tr>
<td>EPM</td>
  <td>Enterprise Performance Management</td>
</tr>

<tr>
<td>EPROM</td>
  <td>Erasable Programmable Read-Only Memory</td>
</tr>

<tr>
<td>ESCD</td>
  <td>Extended System Configuration Data</td>
</tr>

<tr>
<td>ESM</td>
  <td>Enterprise Service Management</td>
</tr>

<tr>
<td>ESDI</td>
  <td>Enhanced Small Device Interface</td>
</tr>


<tr>
<td>eGPU</td>
  <td>External Graphics Processing Unit</td>
</tr>

<tr>
<td id="esata">eSATA</td>
  <td>External Serial Advanced Technology Attachment</td>
</tr>

<tr>
<td>EULA</td>
  <td>End-User License Agreement</td>
</tr>

<tr>
<td>EXIF</td>
  <td>Exchangeable Image File Format</td>
</tr>

<tr>
<td>FAQ</td>
  <td>FRequently Asked Questions</td>
</tr>

<tr>
<td>FDD</td>
  <td>Floppy Disk Drive</td>
</tr>

<tr>
<td>FDDI</td>
  <td>Fiber Distributed Data Interface</td>
</tr>

<tr>
<td>FHSS</td>
  <td>Frequency-hoping Spread Spectrum</td>
</tr>

<tr>
<td>FIFO</td>
  <td>First in, First out</td>
</tr>

<tr>
<td>Fios</td>
  <td>Fiber Optic Service</td>
</tr>

<tr>
<td>FTP</td>
  <td>File Transfer Protocol</td>
</tr>

<tr>
<td>FTTN</td>
  <td>Fiber-to-the-Node</td>
</tr>

<tr>
<td>Gbps</td>
  <td>Gigabits per Second</td>
</tr>

<tr>
<td>GDI</td>
  <td>Graphics Device Interface</td>
</tr>

<tr>
<td>GDSN</td>
  <td>Global Data Synchronization Network</td>
</tr>

<tr>
<td>GEAR</td>
  <td>Gigabyte Enhanced Agp Riser</td>
</tr>

<tr>
<td>GEO/GEOS</td>
  <td>Geo-Stationary Earth Orbit System</td>
</tr>

<tr>
<td>GIGO</td>
  <td>garbage in, garbage out</td>
</tr>

<tr>
<td>GIMP</td>
  <td>GNU Image Manipulation Program</td>
</tr>

<tr>
<td>GINA</td>
  <td>Graphical Identification and Authentication</td>
</tr>

<tr>
<td>GIX</td>
  <td>Global Interchange Exchange</td>
</tr>

<tr>
<td>GMRS</td>
  <td>General Mobile Radio Service</td>
</tr>

<tr>
<td>GMS</td>
  <td>Global Messaging Service</td>
</tr>

<tr>
<td>GMSK</td>
  <td>Gaussian Minimum Shift Keying</td>
</tr>

<tr>
<td>GNN</td>
  <td>Global Network Navigator</td>
</tr>


<tr>
<td>GPL</td>
  <td>General Public License</td>
</tr>

<tr>
<td>GPIO</td>
  <td>General Purpose I/O</td>
</tr>

<tr>
<td>GPRS</td>
  <td>General Packet Radio Service</td>
</tr>


<tr>
<td id="gps">GPS</td>
  <td>Global Positioning System</td>
</tr>

<tr>
<td>GPSL</td>
  <td>General Purpose Scripting Language</td>
</tr>

<tr>
<td>GPU</td>
  <td>Graphics Processing Unit</td>
</tr>

<tr>
<td>GSM</td>
  <td>Global System for Mobile Communication</td>
</tr>

<tr>
<td>GUI</td>
  <td>Graphical User Interface</td>
</tr>

<tr>
<td>GUID</td>
  <td>Globally Unique Identifier</td>
</tr>

<tr>
<td>HAN</td>
  <td>Home Area Network</td>
</tr>

<tr>
<td>HD</td>
  <td>High Definition</td>
</tr>

<tr>
<td>HDCP</td>
  <td>High-bandwidth Digital Content Protection</td>
</tr>

<tr>
<td id="hdd">HDD</td>
  <td>Hard Disk Drive</td>
</tr>

<tr>
<td id="hdmi">HDMI</td>
  <td>High-Definition Multimedia Interface</td>
</tr>

<tr>
<td>HDR</td>
  <td>High Dynamic Range</td>
</tr>

<tr>
<td>HDSL</td>
  <td>High bit-rate Digital Subscriber Line</td>
</tr>

<tr>
<td>HDTV</td>
  <td>High Definition Television</td>
</tr>

<tr>
<td>HDV</td>
  <td>High-Definition Video</td>
</tr>

<tr>
<td>HFS</td>
  <td>Hierarchical File System</td>
</tr>


<tr>
<td>HSF</td>
  <td>Heat Sink and Fan</td>
</tr>

<tr>
<td id="html">HTML</td>
  <td>Hyper-Text markup language</td>
</tr>

<tr>
<td id="https">HTTPS</td>
  <td>Hypertext Transfer Protocol Secure</td>
</tr>

<tr>
<td>I/O</td>
  <td>Input/Output</td>
</tr>

<tr>
<td>ICANN</td>
  <td>Internet Corporation For Assigned Names and Numbers</td>
</tr>

<tr>
<td>ICCID</td>
  <td>Integrated Circuit Card Identifier</td>
</tr>

<tr>
<td>ICF</td>
  <td>Internet Connection Firewall</td>
</tr>

<tr>
<td>ICMP</td>
  <td>Internet Control message Protoccol</td>
</tr>

<tr>
<td>ICS</td>
  <td>Internet Connection Sharing</td>
</tr>

<tr>
<td>ICT</td>
  <td>Information and Communication Technologies</td>
</tr>

<tr>
<td>IDE</td>
  <td>Integrated Device Electronics or  Integrated Development Environment</td>
</tr>

<tr>
<td>IEEE</td>
  <td>Institute of Electrical and Electronics Engineers</td>
</tr>

<tr>
<td>IGP</td>
  <td>Integrated Graphics Processors</td>
</tr>

<tr>
<td>IIS</td>
  <td>Internet Information Services</td>
</tr>

<tr>
<td>IM</td>
  <td>Instant Message</td>
</tr>

<tr>
<td>IMAP</td>
  <td>Internet Message Access Protocol</td>
</tr>

<tr>
<td>IMEI</td>
  <td>Internet Mobile Equipment Identity</td>
</tr>

<tr>
<td>InterNIC</td>
  <td>Internet Network Information Center</td>
</tr>

<tr>
<td>IOPS</td>
  <td>Input/Output Operations Per Second</td>
</tr>

<tr>
<td>IP</td>
  <td>Internet Protocol</td>
</tr>

<tr>
<td>IPC</td>
  <td>Interprocess Communication</td>
</tr>

<tr>
<td>IPS</td>
  <td>In-Plane Switching</td>
</tr>

<tr>
<td>IPS</td>
  <td>Intrusion Prevension System</td>
</tr>

<tr>
<td>IPX</td>
  <td>Internetwork Packet Exchange</td>
</tr>

<tr>
<td>IrDA</td>
  <td>Infrared Data Association</td>
</tr>

<tr>
<td>IRC</td>
  <td>Internet Relay chat</td>
</tr>

<tr>
<td>IRQ</td>
  <td>Interrupt Request</td>
</tr>

<tr>
<td>ISA</td>
  <td>Industry Standard Architecture</td>
</tr>

<tr>
<td>ISCSI</td>
  <td>Internet Small Computer Systems Interface</td>
</tr>

<tr>
<td>ISDN</td>
  <td>Intergrated Services Digital Network</td>
</tr>

<tr>
<td>ISO</td>
  <td>International Organization for Standardization</td>
</tr>

<tr>
<td>ISP</td>
  <td>Internet Service Provider</td>
</tr>

<tr>
<td>ISR</td>
  <td>Interrupt Service Routine</td>
</tr>

<tr>
<td>IT</td>
  <td>Information Technology</td>
</tr>

<tr>
<td>ITIL</td>
  <td>Information Technology Infrastructure Library</td>
</tr>

<tr>
<td>IVR</td>
  <td>Interactive Voice Response</td>
</tr>

<tr>
<td>JDBC</td>
  <td>Java Database Connectivity</td>
</tr>

<tr>
<td>JFS</td>
  <td>Journaled File System</td>
</tr>

<tr>
<td>JPEG</td>
  <td>Joint Photographic Experts Group</td>
</tr>

<tr>
<td>JRE</td>
  <td>Java Routine Environment</td>
</tr>

<tr>
<td>JS</td>
  <td>JavaScript</td>
</tr>

<tr>
<td>JSF</td>
  <td>JavaServer Faces</td>
</tr>

<tr>
<td>JSON</td>
  <td>JavaScript Object Notation</td>
</tr>

<tr>
<td>JSP</td>
  <td>Java Server Page</td>
</tr>

<tr>
<td>JVM</td>
  <td>Java Virtual Machine</td>
</tr>

<tr>
<td>Kbps</td>
  <td>Kilobite Per Second</td>
</tr>

<tr>
<td>KDE</td>
  <td>K DEsktop Environment</td>
</tr>

<tr>
<td>KVM Switch</td>
  <td>Keyboard,Video, and Mouse  Switch</td>
</tr>

<tr>
<td>LAMP</td>
  <td>Linux,Apache,MySQL,and PHP</td>
</tr>

<tr>
<td>LAN</td>
  <td>Local Area Network</td>
</tr>

<tr>
<td id="lcd">LCD</td>
  <td>Liquid Crystal Display</td>
</tr>

<tr>
<td>LDAP</td>
  <td>Lightweight Directory Access Protocol</td>
</tr>

<tr>
<td id="led">LED</td>
  <td>Light-Emitting Diode</td>
</tr>

<tr>
<td>LFN</td>
  <td>Long Filename</td>
</tr>

<tr>
<td>LIFO</td>
  <td>Last in,First out</td>
</tr>

<tr>
<td>LPI</td>
  <td>Lines Per Inch</td>
</tr>

<tr>
<td>LTE</td>
  <td>Long Term Evolution</td>
</tr>

<tr>
<td>LUN</td>
  <td>Logical Unit Number</td>
</tr>

<tr>
<td>MAC Address</td>
  <td>Media Access Control Address</td>
</tr>

<tr>
<td>MAMP</td>
  <td>Mac OS X Apache,MySQL,and PHP</td>
</tr>

<tr>
  <td>MAN</td>
  <td>Metropolitan Area Network</td>
</tr>

<tr>
<td>MANET</td>
  <td>Mobile Ad Hoc Network</td>
</tr>

<tr>
<td>Mbps</td>
  <td>Megabits Per Second</td>
</tr>

<tr>
<td>MBR</td>
  <td>Master Boot Record</td>
</tr>

<tr>
<td>MCA</td>
  <td>Micro Channel Architecture</td>
</tr>

<tr>
<td>MDI</td>
  <td>Medium Dependent Interface</td>
</tr>

<tr>
  <td id="mdp">MDP</td>
  <td>Mini DisplayPort</td>
</tr>

<tr>
<td id="midi">MIDI</td>
  <td>Musical Instrument Digital Interface</td>
</tr>

<tr>
<td>MIPS</td>
  <td>Million Instructions Per Second</td>
</tr>

<tr>
<td>MIS</td>
  <td>Management Information System</td>
</tr>

<tr>
<td>MMS</td>
  <td>Multimedia Messaging Service</td>
</tr>

<tr>
<td id="modem1">MODEM</td>
  <td>modulator/demodulator</td>
</tr>

<tr>
<td>MP3</td>
  <td>MPEG-1 Audio layer-3</td>
</tr>

<tr>
<td>MPEG</td>
  <td>Moving Picture Experts Group</td>
</tr>

<tr>
<td>MTU</td>
  <td>Maximum Transmission Unit</td>
</tr>

<tr>
<td>MVC</td>
  <td>Model-View-Controller</td>
</tr>

<tr>
<td>MX</td>
  <td>Mail Exchange</td>
</tr>

<tr>
<td>NAT</td>
  <td>Network Address Translation</td>
</tr>

<tr>
<td>NetBIOS</td>
  <td>Network Basic Input/Output System</td>
</tr>

<tr>
<td>NFC</td>
  <td>Near Field Communication</td>
</tr>

<tr>
<td>NFT</td>
  <td>Non-Fungible Token</td>
</tr>

<tr>
<td>NIC</td>
  <td>Network Interface Card</td>
</tr>

<tr>
<td id="nlx">NLX</td>
  <td>New Low-Profile Extended</td>
</tr>

<tr>
<td>NMS</td>
  <td>Network Management System</td>
</tr>

<tr>
<td>NNTP</td>
  <td>Network News Transfer Protocol</td>
</tr>

<tr>
<td>NOC</td>
  <td>Network Operations Center</td>
</tr>

<tr>
<td>NOS</td>
  <td>Network Operating System</td>
</tr>

<tr>
<tr>
  <td>NPN</td>
  <td>Negative Positive- Negative</td>
</tr>
<td>NSP</td>
  <td>Network Service Provider</td>
</tr>

<tr>
<td>NTFS</td>
  <td>New Technology File System</td>
</tr>

<tr>
<td>NTP</td>
  <td>Network Time Protocol</td>
</tr>

<tr>
  <td id="ntsc">NTSC</td>
  <td>National Television System Committee</td>
</tr>

<tr>
<td>NUI</td>
  <td>Natural User Interface</td>
</tr>

<tr>
<td>NVRAM</td>
  <td>Non-Volatile Random Access Memory</td>
</tr>

<tr>
<td>OASIS</td>
  <td>Organisation for the Advancement of Structured Information Standards</td>
</tr>

<tr>
<td>OCR</td>
  <td>Optical Character Recognition</td>
</tr>

<tr>
<td>ODBC</td>
  <td>Open Database Connectivity</td>
</tr>

<tr>
<td>OEM</td>
  <td>Original Equipment Manufacturer</td>
</tr>

<tr>
<td>OFDM</td>
  <td>Orthogonal Frequency Division Multiplexing</td>
</tr>

<tr>
<td>OLAP</td>
  <td>Online Analytical Processing</td>
</tr>

<tr>
<td>OLE</td>
  <td>Object Linking and Embedding</td>
</tr>

<tr>
<td>OLED</td>
  <td>Organic Light Emmiting Diode</td>
</tr>

<tr>
<td>OOP</td>
  <td>Object-Oriented Programming</td>
</tr>

<tr>
<td>OSPF</td>
  <td>Open Shortest Path First</td>
</tr>

<tr>
<td>OTA</td>
  <td>Over-The-Air</td>
</tr>

<tr>
<td>PAN</td>
  <td>Personal Area Network</td>
</tr>

<tr>
<td>PAT</td>
  <td>Port address Translation</td>
</tr>

<tr>
<td>P2P</td>
  <td>Peer-to-Peer</td>
</tr>

<tr>
<td>PC</td>
  <td>Personal Computer</td>
</tr>

<tr>
<td>PCB</td>
  <td>Printed Circuit Board</td>
</tr>

<tr>
<td id="pci">PCI</td>
  <td>Peripheral Component Interconnect</td>
</tr>

<tr>
<td>PCI-X</td>
  <td>Peripheral Component Interconnect Extended</td>
</tr>

<tr>
<td>PCMCIA</td>
  <td>Personal Computer Memory Card International Association</td>
</tr>

<tr>
<td>PDA</td>
  <td>Personal Digital Assistant</td>
</tr>

<tr>
<td>PDF</td>
  <td>Portable Document Format</td>
</tr>

<tr>
<td>PDU</td>
  <td>Protocol Data Unit</td>
</tr>

<tr>
<td>PHP</td>
  <td>Hypertext Preprocessor</td>
</tr>

<tr>
<td>PIM</td>
  <td>Personal Information Manager</td>
</tr>

<tr>
<td>PMU</td>
  <td>Power Management Unit</td>
</tr>

<tr>
<td id="png">PNG</td>
  <td>Portable Network Graphic</td>
</tr>

<tr>
<td>PoE</td>
  <td>Power over Ethernet</td>
</tr>

<tr>
<td>PON</td>
  <td>Passive Optical Network</td>
</tr>

<tr>
<td id="pop3">POP3</td>
  <td>Post Office Protocol</td>
</tr>

<tr>
<td id="post">POST</td>
  <td>Power On Self Test</td>
</tr>

<tr>
<td>POTS</td>
  <td>Plain Old Telephone Service</td>
</tr>

<tr>
<td id="ppc">PPC</td>
  <td>Pay Per Click</td>
</tr>

<tr>
<td>PPGA</td>
  <td>Plastic Pin Grid Array</td>
</tr>

<tr>
<td>PPI</td>
  <td>Pixels Per Inch</td>
</tr>

<tr>
<td>PPP</td>
  <td>Point-to-point Protocol</td>
</tr>

<tr>
<td>PPPoE</td>
  <td>Point-to-Point Protocol over Ethernet</td>
</tr>

<tr>
<td>PPTP</td>
  <td>Point-to-Point Tunneling Protocol</td>
</tr>

<tr>
<td>PRAM</td>
  <td>Parameter Random Access Memory</td>
</tr>

<tr>
<td>PROM</td>
  <td>Programmable Read Only Memory</td>
</tr>

<tr>
<td id="ps2">PS/2</td>
  <td>Personal System/2</td>
</tr>


<tr>
<td id="pstn">PSTN</td>
  <td>Public Switched Telephone Network</td>
</tr>

<tr>
<td>PUP</td>
  <td>Potentially Unwanted Program</td>
</tr>

<tr>
<td>QBE</td>
  <td>Query By Example</td>
</tr>
<tr> 
<td>QBDG</td>
  <td>Query Based Distribution Group</td>
</tr>

<tr> 
<td>QBDL</td>
  <td>Query Based Distribution List</td>
</tr>
<tr> 
<td>QCIF</td>
  <td>Quarter Common Intermediate Format</td>
</tr>
<tr> 
<td>QD</td>
  <td>Queuing Delay</td>
</tr>
<tr> 
<td>QDF</td>
  <td>Quicken Data File</td>
</tr>
<tr> 
<td>QDOS</td>
  <td>Quick And Dirty Operating System</td>
</tr>
<tr> 
<td>QDR</td>
  <td>Quad Data Rate</td>
</tr>
<tr> 
<td>QEMM</td>
  <td>Quarterdeck Expanded Memory Manage</td>
</tr>
<tr> 
<td>QFE</td>
  <td>Quick Fix Engineering</td>
</tr>
<tr> 
<td>QFP</td>
  <td>Quoted For Permanence</td>
</tr>
<tr> 
<td>QI</td>
  <td>Query Interface </td>
</tr>
<tr> 
<td>qic</td>
  <td>Quarter-Inch Cartridge  </td>
</tr>
<tr> 
<td>QIF</td>
  <td>Quicken Interchange Format</td>
</tr>
<tr> 
<td>QIP</td>
  <td>quality improvement process</td>
</tr>
<tr> 
<td>QIX</td>
  <td>NASDAQ Information Exchange protocol</td>
</tr>
<tr> 
<td>QLLC</td>
  <td>Qualified Logical Link Control protocol</td>
</tr>
<tr> 
<td>QMF</td>
  <td>Query Management Facility</td>
</tr>
<tr> 
<td>QMS</td>
  <td>Quality Micro Systems</td>
</tr>
<tr> 
<td>QoE</td>
  <td>quality of experience</td>
</tr>
<tr> 
<td>QR code</td>
  <td>Quick Response code</td>
</tr>

<tr>
<td>QSA</td>
  <td>Qualified Security Assessor</td>
</tr>
  <tr> 
<td>QSIG</td>
  <td>Q signaling</td>
</tr>
  <tr> 
<td>QTM</td>
  <td>Quadratic Texture Mapping</td>
</tr>
  <tr> 
<td>QTVR</td>
  <td>QuickTime Virtual Reality</td>
</tr>

<tr>
<td>RAID</td>
  <td>Redundant Array of Independent Disks</td>
</tr>

<tr>
<td>RAM</td>
  <td>Random Access Memory</td>
</tr>

<tr>
<td>RARP</td>
  <td>Reverse Address Resolution Protocol</td>
</tr>

<tr>
<td>RAS</td>
  <td>Remote Access Service</td>
</tr>

<tr>
  <td id="rca">RCA</td>
  <td>Radio Corporation of America</td>
</tr>

<tr>
<td>RDBMS</td>
  <td>Relational Database Management System</td>
</tr>

<tr>
<td>RDF</td>
  <td>Resource Description Framework</td>
</tr>

<tr>
<td>RDP</td>
  <td>Remote Desktop Protocol</td>
</tr>

<tr>
<td>RDRAM</td>
  <td>Rambus Dynamic Random Access Memory</td>
</tr>

<tr>
<td>RFID</td>
  <td>Radio-Frequency Identification</td>
</tr>

<tr>
<td>RIM</td>
  <td>Research In Motion</td>
</tr>

<tr>
<td>RIP</td>
  <td>Routing Information Protocol</td>
</tr>

<tr>
<td>RISC</td>
  <td>Reduced Instruction Set Computing</td>
</tr>

<tr>
<td id="rj">RJ</td>
  <td>Registered jack</td>
</tr>

<tr>
<td id="rom">ROM</td>
  <td>Read-Only Memory</td>
</tr>

<tr>
<td>RPC</td>
  <td>Remote Procedure Call</td>
</tr>

<tr>
<td>RRAS</td>
  <td>Routing and Remote Access Service</td>
</tr>

<tr>
<td>SAN</td>
  <td>Storage Area Network</td>
</tr>

<tr>
<td>Sass</td>
  <td>Synactically Awesome Style Sheets</td>
</tr>

<tr>
<td>SATA</td>
  <td>Serial Advanced Technology Attachment</td>
</tr>

<tr>
<td>SCSI</td>
  <td>Small Computer System Interface</td>
</tr>

<tr>
<td>SD</td>
  <td>Secure Digital</td>
</tr>

<tr>
<td>SDK</td>
  <td>Software Development Kit</td>
</tr>

<tr>
<td>SDLC</td>
  <td>System Development Lifecycle</td>
</tr>

<tr>
<td>SDRAM</td>
  <td>Synchronous Dynamic Random Access Memory</td>
</tr>

<tr>
<td>SDS</td>
  <td>Software-Defined Storage</td>
</tr>

<tr>
<td>SDSL</td>
  <td>Symmetric Digital Subscriber Line</td>
</tr>

<tr>
<td>SEO</td>
  <td>Search Engine Optimization</td>
</tr>

<tr>
<td>SERP</td>
  <td>Search Engine Results Page</td>
</tr>

<tr>
<td>SIM Card</td>
  <td>Subscriber Identification Module Card</td>
</tr>

<tr>
<td>SIMM</td>
  <td>Single in-Line Memory Module</td>
</tr>

<tr>
<td>SIP</td>
  <td>Session Initiation Protocol</td>
</tr>

<tr>
<td id="sli">SLI</td>
  <td>Scalable Link Interface</td>
</tr>

<tr>
<td>SMART</td>
  <td>Self-Monitoring Analysis And Reporting Technology</td>
</tr>

<tr>
<td>SMB</td>
  <td>Server Message Block</td>
</tr>

<tr>
<td>SMM</td>
  <td>Social Media Marketing</td>
</tr>

<tr>
<td>SMS</td>
  <td>Short Message Service</td>
</tr>

<tr>
<td>SMTP</td>
  <td>Simple Mail Transfer Protocol</td>
</tr>

<tr>
<td>SNMP</td>
  <td>Simple Network Management Protocol</td>
</tr>

<tr>
<td>SO-DIMM</td>
  <td>Small Outline Dual In-Line Memory Mobile</td>
</tr>

<tr>
<td>SOA</td>
  <td>Service Oriented Architecture</td>
</tr>

<tr>
<td>SOAP</td>
  <td>Simple Object Access Protocol</td>
</tr>

<tr>
<td>SoC</td>
  <td>System on a Chip</td>
</tr>

<tr>
<td>SOHO</td>
  <td>Small Office, Home Office</td>
</tr>

<tr>
<td>SPX</td>
  <td>Sequenced Packet Exchange</td>
</tr>

<tr>
<td>SQL</td>
  <td>Structured Query Language</td>
</tr>

<tr>
<td>SRAM</td>
  <td>Static Random Access Memory</td>
</tr>

<tr>
<td>SRE</td>
  <td>Site Reliability Engineering</td>
</tr>

<tr>
<td>SSD</td>
  <td>Solid State Drive</td>
</tr>

<tr>
<td>SSH</td>
  <td>Secure Shell</td>
</tr>

<tr>
<td>SSID</td>
  <td>Service Set Identifier</td>
</tr>

<tr>
<td>SSL</td>
  <td>Secure Sockets layer</td>
</tr>

<tr>
  <td>STP</td>
  <td>Shielded Twisted Pair</td>
</tr>

<tr>
<td>TCP/IP</td>
  <td>Transmission Control Protocol/Internet Protocol</td>
</tr>

<tr>
<td>TFT</td>
  <td>Thin-Film Transistor</td>
</tr>

<tr>
<td>TKIP</td>
  <td>Temporary Key Integrity Protocol</td>
</tr>

<tr>
<td>TLS</td>
  <td>Transport Layer Security</td>
</tr>

<tr>
<td>TN</td>
  <td>Twisted Nematic</td>
</tr>

<tr>
  <td id="tv">TV</td>
  <td>Television</td>
</tr>

<tr>
<td>TWAIN</td>
  <td>Toolkit Without An Informative Name</td>
</tr>

<tr>
<td>UAT</td>
  <td>User Acceptance Testing</td>
</tr>

<tr>
<td>UDDI</td>
  <td>Universal Description Discovery and Integration</td>
</tr>

<tr>
<td>UDP</td>
  <td>User Datagram Protocol</td>
</tr>

<tr>
<td>UEFI</td>
  <td>Unified Extensible Firmware Interface</td>
</tr>

<tr>
<td>UGC</td>
  <td>User Generated Content</td>
</tr>

<tr>
<td>UICC</td>
  <td>Universal Integrated Circuit Card</td>
</tr>

<tr>
<td>UML</td>
  <td>Unified Modeling</td>
</tr>

<tr>
<td>UNC</td>
  <td>Universal Naming Convention</td>
</tr>

<tr>
<td>UPnP</td>
  <td>Universal Plug and Play</td>
</tr>

<tr>
<td>UPS</td>
  <td>Uninterruptable Power Supply</td>
</tr>

<tr>
<td id="url">URL</td>
  <td>Uniform Resource Locator</td>
</tr>

<tr>
<td id="usb">USB</td>
  <td>Universal Serial Bus</td>
</tr>

<tr>
<td id="utf">UTF</td>
  <td>Unicode Transformation Format</td>
</tr>

<tr>
<td>UUID</td>
  <td>Universally Unique Identifier</td>
</tr>

<tr>
<td>UWP</td>
  <td>Universal Windows Platform</td>
</tr>

<tr>
<td>VCI</td>
  <td>Virtual Channel Identifier</td>
</tr>

<tr>
<td>VDSL</td>
  <td>Very High Bit Rate Digital Subscriber Line</td>
</tr>

<tr>
<td>VDU</td>
  <td>Visual Display Unit</td>
</tr>

<tr>
<td id="vesa">VESA</td>
  <td>Video Electronics Standards Association</td>
</tr>

<tr>
<td>VFAT</td>
  <td>Virtual File Allocation Table</td>
</tr>

<tr>
<td id="vga">VGA</td>
  <td>Video Graphics Array</td>
</tr>

<tr>
<td>VIP</td>
  <td>Virtual IP Address</td>
</tr>

<tr>
<td>VLAN</td>
  <td>Virtual Local Area Network</td>
</tr>

<tr>
<td>VLE</td>
  <td>Virtual Learning Environment</td>
</tr>

<tr>
<td>VolP</td>
  <td>Voice Over internet Protocol</td>
</tr>

<tr>
<td>VPI</td>
  <td>Virtual Path Identifier</td>
</tr>

<tr>
<td>VPN</td>
  <td>Virtual Private Network</td>
</tr>

<tr>
<td>VPS</td>
  <td>Virtual Private Server</td>
</tr>

<tr>
<td>VRAM</td>
  <td>Video Random Access Memory</td>
</tr>

<tr>
<td>VRML</td>
  <td>Virtual Reality Modeling Language</td>
</tr>

<tr>
<td>W3C</td>
  <td>World Wide Web Consortium</td>
</tr>

<tr>
<td>WAIS</td>
  <td>Wide Area Information Server</td>
</tr>

<tr>
<td>WAMP</td>
  <td>Windows,Apache,MySQL,and PHP</td>
</tr>

<tr>
<td>WAN</td>
  <td>Wide Area Network</td>
</tr>

<tr>
<td>WDDM</td>
  <td>Windows Display Driver Model</td>
</tr>

<tr>
<td>WEBCAM</td>
  <td>World Wide Web Camera</td>
</tr>

<tr>
<td>WEP</td>
  <td>Wired Equivalent Privacy</td>
</tr>

<tr>
<td>WiFi</td>
  <td id="wifi">Wireless Fidelity</td>
</tr>

<tr>
<td>WIMP</td>
  <td>Windows,Icons,Menus,Pointer</td>
</tr>

<tr>
<td>WINS</td>
  <td>Windows Internet Name Service</td>
</tr>

<tr>
<td>WLAN</td>
  <td>Wireless Local Area Network</td>
</tr>

<tr>
<td>WPA</td>
  <td>Wi-Fi Protected Access</td>
</tr>

<tr>
<td>WPA2</td>
  <td>Wi-Fi Protected Access 2</td>
</tr>

<tr>
<td>WWW</td>
  <td>World Wide Web</td>
</tr>

<tr>
<td>WYSIWYG</td>
  <td>What You See Is What You Get</td>
</tr>

<tr>
<td>XAML</td>
  <td>Extensible Application Markup language</td>
</tr>

<tr>
<td>XHTML</td>
  <td>Extensible Hypertext Markup Language</td>
</tr>

<tr>
<td>XML</td>
  <td>Extensible markup Language</td>
</tr>

<tr>
<td>XMP</td>
  <td>Extensible Metadata Platform</td>
</tr>

<tr>
<td>XSLT</td>
  <td>Extensible Style Sheet language Transformation</td>
</tr>

<tr>
<td>Y2K</td>
  <td>Year 2000</td>
</tr>


<tr>
<td>yacc</td>
  <td>yet another compiler compiler</td>
</tr>

<tr>
<td>YAST</td>
  <td>Yet Another Setup Tool</td>
</tr>

<tr>
<td>YB</td>
  <td>Yottabyte</td>
</tr>


<tr>
<td>YiB</td>
  <td>Yobibyte</td>
</tr>

<tr>
<td>YIM</td>
  <td>Yahoo! Instant Messenger</td>
</tr>

<tr>
<td>YKYBHTLW</td>
  <td>you know you've been hacking too long when</td>
</tr>

<tr>
<td>YPN</td>
  <td>Yahoo Publishers Network</td>
</tr>

<tr>
<td>YYYY-MM-DD</td>
  <td>Year Year Year Year - Month Month - Day Day</td>
</tr>

<tr>
<td>ZAPP</td>
  <td>Zero Assignment Parallel Processor</td>
</tr>

<tr>
<td>ZAW</td>
  <td>Zero Administration Window</td>
</tr>

<tr>
<td>ZB</td>
  <td>Zettabyte</td>
</tr>

<tr>
<td>ZBR</td>
  <td>Zero Bug Release</td>
</tr>

<tr>
<td>ZBTSI</td>
  <td>Zero Byte Time Slot Interchange</td>
</tr>

<tr>
<td>ZCS</td>
  <td>zero code suppression</td>
</tr>

<tr>
<td>ZCT</td>
  <td>zero count table</td>
</tr>

<tr>
<td>ZDL</td>
  <td>Zero Delay Lockout</td>
</tr>

<tr>
<td>ZDO</td>
  <td>ZigBee Device Object</td>
</tr>

<tr>
<td>ZFS</td>
  <td>Zettabyte File System</td>
</tr>

<tr>
<td>ZIF</td>
  <td>Zero Insertion Force</td>
</tr>

<tr>
<td>ZIL</td>
  <td>Zork Implementation Language</td>
</tr>

<tr>
<td>zine</td>
  <td>electronic magazine</td>
</tr>

<tr>
<td>ZINK</td>
  <td>Zero INK</td>
</tr>

<tr>
<td>ZIP</td>
  <td>Zone Information Protocol</td>
</tr>

<tr>
<td>ZLE</td>
  <td>zero-latency enterprise</td>
</tr>

<tr>
<td>ZMA</td>
  <td>Zone Multicast Address</td>
</tr>

<tr>
<td>ZNA</td>
  <td>Zero Network Administration</td>
</tr>

<tr>
<td>ZOPE</td>
  <td>Z Object Publishing Environment</td>
</tr>

<tr>
<td>ZTE</td>
  <td>Zhong Xing Telecommunication Equipment</td>
</tr>

<tr>
<td>ZTLP</td>
  <td>Zero Transmission Level Point</td>
</tr>

<tr>
<td>zsh</td>
  <td>Z shell</td>
</tr>
    
</tbody>
                  </table>

                  </div>
</div>

<ScrollToTop smooth className="scrolly" />
        </>
    )
}