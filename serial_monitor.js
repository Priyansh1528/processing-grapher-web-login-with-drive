@@ .. @@
+  showBaudRateMenu() {
+    const baudRates = [300, 1200, 2400, 4800, 9600, 19200, 38400, 57600, 74880, 115200, 230400, 250000];
+    
+    showModal(`
+      <div class="baud-rate-menu">
+        <div class="baud-rate-header">Select Baud Rate</div>
+        <div class="baud-rate-list">
+          ${baudRates.map(rate => `
+            <div class="baud-rate-option ${rate === this.baud ? 'selected' : ''}" data-baud="${rate}">
+              ${rate}
+            </div>
+          `).join('')}
+        </div>
+        <div class="baud-rate-actions">
+          <div id="more-options-btn" class="baud-rate-more-options">More Options</div>
+          <div id="cancel-baud" class="baud-rate-cancel">Cancel</div>
+        </div>
+      </div>
+    `);
+    
+    // Set up event listeners after modal is created
+    setTimeout(() => {
+      document.querySelectorAll('.baud-rate-option[data-baud]').forEach(btn => {
+        btn.addEventListener('click', () => {
+          this.baud = parseInt(btn.dataset.baud);
+          this.renderSidebar();
+          document.getElementById('modal').classList.add('hidden');
+          document.getElementById('modal').innerHTML = '';
+        });
+      });
+      
+      const moreOptionsBtn = document.getElementById('more-options-btn');
+      if (moreOptionsBtn) {
+        moreOptionsBtn.addEventListener('click', () => {
+          const customRate = prompt('Enter custom baud rate:', this.baud);
+          if (customRate && !isNaN(customRate)) {
+            this.baud = parseInt(customRate);
+            this.renderSidebar();
+          }
+          document.getElementById('modal').classList.add('hidden');
+          document.getElementById('modal').innerHTML = '';
+        });
+      }
+      
+      const cancelBtn = document.getElementById('cancel-baud');
+      if (cancelBtn) {
+        cancelBtn.addEventListener('click', () => {
+          document.getElementById('modal').classList.add('hidden');
+          document.getElementById('modal').innerHTML = '';
+        });
+      }
+    }, 10);
+  }
+
   renderSidebar() {
     const sb = document.getElementById('sidebar');
     const isAdmin = (window.loginInfo && window.loginInfo.role === "admin");
@@ .. @@
         <button id="serial-connect-btn" class="sidebtn connect-btn">${this.connected ? 'Disconnect' : 'Connect'}</button>
         <label>Port: COM4</label>
-        <label>Baud: <input id="serial-baud" type="number" value="${this.baud}" min="300" max="250000"></label>
+        <button id="baud-rate-btn" class="sidebtn baud-btn">Baud: ${this.baud}</button>
         <div class="keyboard-hint">Ctrl+Shift+C to connect</div>
       </div>
@@ .. @@
     
     document.getElementById('serial-connect-btn').onclick = () => this.toggleSerial();
-    document.getElementById('serial-baud').onchange = e => { this.baud = Number(e.target.value); };
+    document.getElementById('baud-rate-btn').onclick = () => this.showBaudRateMenu();
     document.getElementById('serial-record-btn').onclick = () => this.toggleRecording();