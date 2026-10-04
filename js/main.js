/**
 * Codespot Theme JavaScript — Pranish Prajapati
 * Interactive Terminal, Toast, Copy-to-Clipboard & Mobile Nav
 */

document.addEventListener('DOMContentLoaded', () => {

  // Toast Notification
  const toast = document.getElementById('toast');
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // Copy Email Buttons
  document.querySelectorAll('.copy-email-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'pranishprajapati721@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('✓ Email copied to clipboard: ' + email);
      }).catch(() => {
        window.location.href = 'mailto:' + email;
      });
    });
  });

  // Interactive Terminal Logic
  const termScreen = document.getElementById('term-screen');
  const termInput = document.getElementById('term-input');
  const chipButtons = document.querySelectorAll('.chip-btn');

  const terminalCommands = {
    help: () => `
<span class="term-green">Available commands:</span>
  <span class="term-white">status</span>       - Check live datacenter & NOC shift status
  <span class="term-white">experience</span>   - View Silver Lining DC work history
  <span class="term-white">skills</span>       - Inspect technical capabilities
  <span class="term-white">datacenter</span>   - Inspect facility telemetry & tier specs
  <span class="term-white">cv</span>           - Trigger CV download (PDF)
  <span class="term-white">ping 8.8.8.8</span> - Simulate ICMP packet transmission
  <span class="term-white">clear</span>        - Clear terminal screen
`,
    status: () => `
<span class="term-green">[NOC OPERATIONAL TELEMETRY]</span>
  Host: Silver Lining Data Center (Kamalpokhari, Kathmandu)
  Technician: Pranish Prajapati (NOC & Hardware Diagnostics)
  Core Uplinks: 10G SFP+ Active / BGP Dual-Homed
  PDU Feeds: Feed A (230V / Nominal) | Feed B (230V / Nominal)
  Uptime SLA: 99.98% / 0 Critical Alarms
  Current Shift: Monitoring Active / Escalation Ready
`,
    experience: () => `
<span class="term-green">[PROFESSIONAL EXPERIENCE]</span>
  • <span class="term-white">Datacenter Technician</span> — Silver Lining Data Center
    - 24/7 continuous telemetry oversight of server clusters, switches, and PDUs.
    - Tier 1 & 2 hardware troubleshooting: RAM replacement, RAID array rebuilds, PSU swap.
    - Incident management & root-cause analysis (RCA) reporting adhering to client SLAs.
  • <span class="term-white">Bachelor of Information Management (BIM)</span> — Tribhuvan University
    - Systems engineering, database architecture, and network security.
`,
    skills: () => `
<span class="term-green">[TECHNICAL SKILLS MATRIX]</span>
  1. Datacenter Operations: NOC monitoring, hardware diagnostics, rack cabling, PDU tracking.
  2. Network Engineering: VLAN 802.1Q trunking, Router-on-a-Stick, subnetting, Wireshark.
  3. Operations & SLA: Incident escalation, shift handover reports, client communication.
  4. Systems & Tooling: Linux/Windows Server, PHP, MySQL, Stripe API, Git.
`,
    datacenter: () => `
<span class="term-green">[FACILITY & RACK TELEMETRY]</span>
  Location: Kamalpokhari, Kathmandu Valley, Nepal
  Power: Dual A+B Utility Feeds + N+1 Diesel Generators
  Cooling: Precision In-Row CRAC Units · Cold Aisle Containment (20.5°C)
  Structured Cabling: Overhead Fiber Raceways / Cat6 High-Density Patching
  Security: Multi-Factor Biometric Access + 24/7 CCTV Surveillance
`,
    cv: () => {
      const link = document.createElement('a');
      link.href = 'assets/Pranish_Prajapati_CV.pdf';
      link.download = 'Pranish_Prajapati_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return `<span class="term-green">✓ Download initiated: Pranish_Prajapati_CV.pdf</span>`;
    },
    'ping 8.8.8.8': () => `
PING 8.8.8.8 (8.8.8.8): 56 data bytes
64 bytes from 8.8.8.8: icmp_seq=0 ttl=118 time=14.2 ms
64 bytes from 8.8.8.8: icmp_seq=1 ttl=118 time=13.8 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=118 time=14.1 ms
--- 8.8.8.8 ping statistics ---
3 packets transmitted, 3 packets received, 0.0% packet loss
round-trip min/avg/max = 13.8/14.0/14.2 ms
`,
    ping: () => `Usage: ping &lt;ip-address&gt; (try: 'ping 8.8.8.8')`
  };

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      termScreen.innerHTML = '';
      return;
    }

    const outputLine = document.createElement('div');
    outputLine.innerHTML = `<span class="terminal-prompt">pranish@codespot-dc:~$</span> <span class="term-white">${escapeHtml(rawCmd)}</span>`;
    termScreen.appendChild(outputLine);

    const resultLine = document.createElement('div');
    if (terminalCommands[cmd]) {
      resultLine.innerHTML = terminalCommands[cmd]();
    } else {
      resultLine.innerHTML = `<span class="term-dim">Command not found: '${escapeHtml(cmd)}'. Type <span class="term-green">'help'</span> for available commands.</span>`;
    }
    termScreen.appendChild(resultLine);
    termScreen.scrollTop = termScreen.scrollHeight;
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  if (termInput) {
    termInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = termInput.value;
        termInput.value = '';
        executeCommand(val);
      }
    });
  }

  chipButtons.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) {
        if (termInput) termInput.value = '';
        executeCommand(cmd);
      }
    });
  });

  // Mobile menu drawer toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navDock = document.getElementById('nav-dock');
  if (mobileToggle && navDock) {
    mobileToggle.addEventListener('click', () => {
      const isVisible = navDock.style.display === 'flex';
      navDock.style.display = isVisible ? 'none' : 'flex';
      navDock.style.flexDirection = 'column';
      navDock.style.position = 'absolute';
      navDock.style.top = '100%';
      navDock.style.left = '20px';
      navDock.style.right = '20px';
      navDock.style.padding = '20px';
      navDock.style.background = 'rgba(9, 14, 11, 0.95)';
    });
  }

});
