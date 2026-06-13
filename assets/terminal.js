(function () {
  'use strict';

  // ── Data ──────────────────────────────────────────────────────────────────

  const BANNER = [
    ' __   ___                     _     ____  _',
    ' \\ \\ / (_)_ __   ___ ___ _ __| |_  |  _ \\| | ___  ___ ___ _   _',
    '  \\ V /| | \'_ \\/ __/ _ \\ \'__| __| | |_) | |/ _ \\/ __/ __| | | |',
    '   | | | | | | | (_|  __/ |  | |_  |  __/| |  __/\\__ \\__ \\ |_| |',
    '   |_| |_|_| |_|\\___\\___|_|   \\__| |_|   |_|\\___||___/___/\\__, |',
    '                                                                 |___/',
    'Backend & Security Engineer'
  ];

  const projects = {
    'incident-tracker-api': {
      description: 'REST API for security incident management.',
      stack: 'Python · Flask · PostgreSQL · JWT · Docker',
      github: 'https://github.com/vincent-p-essy/incident-tracker-api',
      status: 'Production-ready · 97% test coverage',
      role: 'Core incident management service'
    },
    'security-audit-logger': {
      description: 'Structured audit logging middleware for .NET APIs.',
      stack: 'C# · ASP.NET Core · Clean Architecture · TDD',
      github: 'https://github.com/vincent-p-essy/security-audit-logger',
      status: 'Production-ready',
      role: 'Feeds audit events to the correlation engine'
    },
    'threat-correlation-engine': {
      description: 'Correlates security alerts using YAML rules and temporal analysis.',
      stack: 'Python · PyYAML · REST · pytest',
      github: 'https://github.com/vincent-p-essy/threat-correlation-engine',
      status: 'Active development',
      role: 'Brain of the security ecosystem'
    },
    'pcap-analyzer': {
      description: 'Network capture analyzer detecting attacks at the byte level.',
      stack: 'C · libpcap · JSON output',
      github: 'https://github.com/vincent-p-essy/pcap-analyzer',
      status: 'Active development',
      role: 'Low-level network intelligence'
    },
    'ci-security-gate': {
      description: 'Reusable GitHub Actions workflow for automated security checks.',
      stack: 'GitHub Actions · Python · YAML',
      github: 'https://github.com/vincent-p-essy/ci-security-gate',
      status: 'Active — runs on all repos',
      role: 'Security at every commit'
    }
  };

  const skills = {
    'backend': {
      label: 'Backend',
      items: [
        'Python (Flask, FastAPI, pytest)',
        'C# / ASP.NET Core',
        'REST API design & versioning',
        'PostgreSQL · SQL · ORM',
        'JWT authentication · OAuth2',
        'Clean Architecture · TDD'
      ]
    },
    'security': {
      label: 'Security',
      items: [
        'Incident tracking & triage',
        'Structured audit logging',
        'Threat correlation & YAML rules',
        'Network traffic analysis (libpcap)',
        'CI/CD security gates',
        'OWASP principles'
      ]
    },
    'systems': {
      label: 'Systems',
      items: [
        'C / systems programming',
        'Network protocols (TCP/IP, pcap)',
        'Byte-level packet analysis',
        'JSON / binary output formats',
        'Linux environments'
      ]
    },
    'devops': {
      label: 'DevOps',
      items: [
        'Docker · containers',
        'GitHub Actions · CI/CD',
        'Reusable workflow design',
        'Git · branching strategies',
        'Automated testing pipelines'
      ]
    }
  };

  const COMMANDS = ['help', 'whoami', 'ls', 'cat', 'open', 'contact', 'clear', 'banner', 'echo'];

  // ── State ─────────────────────────────────────────────────────────────────

  const output  = document.getElementById('output');
  const input   = document.getElementById('cmd-input');
  const terminal = document.getElementById('terminal');

  let history = [];
  let historyIndex = -1;

  // ── Helpers ───────────────────────────────────────────────────────────────

  function scrollBottom() {
    terminal.scrollTop = terminal.scrollHeight;
  }

  function createLine(html, className) {
    const span = document.createElement('span');
    span.className = 'line' + (className ? ' ' + className : '');
    span.innerHTML = html;
    output.appendChild(span);
    scrollBottom();
    return span;
  }

  function printLine(html, className) {
    createLine(html, className);
  }

  function printBlank() {
    printLine('');
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function printPromptEcho(cmd) {
    printLine('<span class="prompt">$ </span>' + escapeHtml(cmd));
  }

  // ── Commands ──────────────────────────────────────────────────────────────

  function cmdHelp() {
    printBlank();
    printLine('<span class="highlight">Available commands:</span>');
    printBlank();
    const cmds = [
      ['help',              'Show this help message'],
      ['whoami',            'About Vincent Plessy'],
      ['ls projects/',      'List all projects'],
      ['cat projects/&lt;name&gt;', 'Show project details'],
      ['open &lt;name&gt;',        'Alias for cat projects/&lt;name&gt;'],
      ['ls skills/',        'List skill categories'],
      ['cat skills/&lt;cat&gt;',   'Show skills for a category'],
      ['contact',           'Email &amp; social links'],
      ['banner',            'Display ASCII art banner'],
      ['echo &lt;text&gt;',        'Print text to terminal'],
      ['clear',             'Clear the terminal'],
    ];
    cmds.forEach(([name, desc]) => {
      printLine(
        '  <span class="cmd-name">' + name + '</span>' +
        '<span class="gray">' + ' '.repeat(Math.max(1, 36 - name.replace(/<[^>]+>/g, '').length)) + '</span>' +
        '<span class="comment">' + desc + '</span>'
      );
    });
    printBlank();
  }

  function cmdWhoami() {
    printBlank();
    printLine('<span class="highlight">Vincent Plessy</span> <span class="comment">— Backend &amp; Security Engineer</span>');
    printLine('<span class="value">Exploring systems from packet headers to production APIs.</span>');
    printLine('<span class="value">I build secure, well-tested backend services and the tooling</span>');
    printLine('<span class="value">that keeps them honest — audit logs, threat correlation, CI gates.</span>');
    printBlank();
  }

  function cmdLsProjects() {
    printBlank();
    printLine('<span class="highlight">projects/</span>');
    printBlank();
    const names = Object.keys(projects);
    const grid = document.createElement('span');
    grid.className = 'line';
    const gridDiv = document.createElement('div');
    gridDiv.className = 'project-grid';
    names.forEach(name => {
      const p = projects[name];
      const item = document.createElement('div');
      item.className = 'project-item';
      item.innerHTML =
        '<span class="cmd-name">' + escapeHtml(name) + '</span><br>' +
        '<span class="desc">' + escapeHtml(p.description) + '</span>';
      gridDiv.appendChild(item);
    });
    grid.appendChild(gridDiv);
    output.appendChild(grid);
    printBlank();
    printLine('<span class="comment"># Use `cat projects/&lt;name&gt;` for details</span>');
    printBlank();
    scrollBottom();
  }

  function cmdCatProject(name) {
    const p = projects[name];
    if (!p) {
      printLine(
        '<span class="error">cat: projects/' + escapeHtml(name) +
        ': No such file or directory</span>'
      );
      return;
    }
    printBlank();
    printLine('<span class="highlight">projects/' + escapeHtml(name) + '</span>');
    printBlank();
    printLine('<span class="label">Description  </span><span class="value">' + escapeHtml(p.description) + '</span>');
    printLine('<span class="label">Stack        </span><span class="warning">' + escapeHtml(p.stack) + '</span>');
    printLine('<span class="label">Role         </span><span class="value">' + escapeHtml(p.role) + '</span>');
    printLine('<span class="label">Status       </span><span class="success">' + escapeHtml(p.status) + '</span>');
    printLine('<span class="label">GitHub       </span><a href="' + p.github + '" target="_blank" rel="noopener">' + escapeHtml(p.github) + '</a>');
    printBlank();
  }

  function cmdLsSkills() {
    printBlank();
    printLine('<span class="highlight">skills/</span>');
    printBlank();
    Object.keys(skills).forEach(key => {
      printLine('  <span class="cmd-name">' + key + '/</span>  <span class="comment">' + skills[key].label + '</span>');
    });
    printBlank();
    printLine('<span class="comment"># Use `cat skills/&lt;category&gt;` for details</span>');
    printBlank();
  }

  function cmdCatSkill(cat) {
    const s = skills[cat];
    if (!s) {
      printLine(
        '<span class="error">cat: skills/' + escapeHtml(cat) +
        ': No such file or directory</span>'
      );
      return;
    }
    printBlank();
    printLine('<span class="highlight">skills/' + escapeHtml(cat) + '</span>');
    printBlank();
    s.items.forEach(item => {
      printLine('  <span class="value">· ' + escapeHtml(item) + '</span>');
    });
    printBlank();
  }

  function cmdContact() {
    printBlank();
    printLine('<span class="highlight">Contact</span>');
    printBlank();
    printLine('  <span class="label">Email    </span><a href="mailto:vincent.plessy12@gmail.com">vincent.plessy12@gmail.com</a>');
    printLine('  <span class="label">GitHub   </span><a href="https://github.com/vincent-p-essy" target="_blank" rel="noopener">https://github.com/vincent-p-essy</a>');
    printLine('  <span class="label">Portfolio </span><a href="https://vincent-p-essy.github.io" target="_blank" rel="noopener">https://vincent-p-essy.github.io</a>');
    printBlank();
  }

  function cmdBanner() {
    printBlank();
    BANNER.forEach(line => printLine('<span class="banner">' + escapeHtml(line) + '</span>'));
    printBlank();
  }

  function cmdClear() {
    output.innerHTML = '';
  }

  function cmdEcho(args) {
    printLine(escapeHtml(args.join(' ')));
  }

  // ── Dispatch ──────────────────────────────────────────────────────────────

  function dispatch(raw) {
    const trimmed = raw.trim();
    if (!trimmed) return;

    printPromptEcho(trimmed);

    const parts = trimmed.split(/\s+/);
    const cmd   = parts[0].toLowerCase();
    const args  = parts.slice(1);

    switch (cmd) {
      case 'help':
        cmdHelp();
        break;

      case 'whoami':
        cmdWhoami();
        break;

      case 'ls': {
        const target = args[0] || '';
        if (target === 'projects/' || target === 'projects') {
          cmdLsProjects();
        } else if (target === 'skills/' || target === 'skills') {
          cmdLsSkills();
        } else if (!target) {
          printLine('<span class="cmd-name">projects/</span>  <span class="cmd-name">skills/</span>');
        } else {
          printLine('<span class="error">ls: cannot access \'' + escapeHtml(target) + '\': No such file or directory</span>');
        }
        break;
      }

      case 'cat': {
        const path = args[0] || '';
        if (path.startsWith('projects/')) {
          const name = path.slice('projects/'.length);
          cmdCatProject(name);
        } else if (path.startsWith('skills/')) {
          const cat = path.slice('skills/'.length);
          cmdCatSkill(cat);
        } else {
          printLine('<span class="error">cat: ' + escapeHtml(path) + ': No such file or directory</span>');
        }
        break;
      }

      case 'open': {
        const name = args[0] || '';
        if (name) {
          cmdCatProject(name);
        } else {
          printLine('<span class="error">open: missing argument</span>');
        }
        break;
      }

      case 'contact':
        cmdContact();
        break;

      case 'clear':
        cmdClear();
        break;

      case 'banner':
        cmdBanner();
        break;

      case 'echo':
        cmdEcho(args);
        break;

      default:
        printLine(
          '<span class="error">bash: command not found: ' + escapeHtml(cmd) +
          '. Type \'help\' for available commands.</span>'
        );
    }
  }

  // ── Input handling ────────────────────────────────────────────────────────

  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      const val = input.value;
      if (val.trim()) {
        history.unshift(val);
        historyIndex = -1;
      }
      input.value = '';
      dispatch(val);

    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length && historyIndex < history.length - 1) {
        historyIndex++;
        input.value = history[historyIndex];
      }

    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        input.value = history[historyIndex];
      } else {
        historyIndex = -1;
        input.value = '';
      }

    } else if (e.key === 'Tab') {
      e.preventDefault();
      const val = input.value;
      const matches = COMMANDS.filter(c => c.startsWith(val));
      if (matches.length === 1) {
        input.value = matches[0] + ' ';
      } else if (matches.length > 1) {
        printPromptEcho(val);
        printLine(matches.map(m => '<span class="cmd-name">' + m + '</span>').join('  '));
      }

    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      cmdClear();
    }
  });

  // Keep focus on input when clicking anywhere in the terminal
  document.getElementById('terminal').addEventListener('click', function (e) {
    if (!window.getSelection().toString()) {
      input.focus();
    }
  });

  // ── Boot sequence ─────────────────────────────────────────────────────────

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function typeWriter(text, className, delayMs) {
    const span = document.createElement('span');
    span.className = 'line' + (className ? ' ' + className : '');
    output.appendChild(span);
    for (const ch of text) {
      span.textContent += ch;
      scrollBottom();
      await sleep(delayMs);
    }
  }

  async function boot() {
    // Banner
    BANNER.forEach(line => printLine('<span class="banner">' + escapeHtml(line) + '</span>'));
    printBlank();

    await sleep(300);

    await typeWriter('Welcome to Vincent Plessy\'s portfolio terminal.', 'comment', 30);
    await sleep(100);
    printLine('<span class="comment">Type \'help\' for available commands.</span>');
    printBlank();

    await sleep(400);

    await typeWriter('$ whoami', 'prompt-line', 50);
    await sleep(250);
    printLine('<span class="highlight">Vincent Plessy</span> <span class="comment">— Backend &amp; Security Engineer</span>');
    printLine('<span class="value">Exploring systems from packet headers to production APIs.</span>');
    printBlank();

    await sleep(200);

    input.focus();
  }

  boot();

})();
