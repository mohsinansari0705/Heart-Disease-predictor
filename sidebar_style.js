/* ----- Sidebar ----- */
#sidebar {
  position: fixed;
  left: 0;
  top: calc(4.5rem + 0.5rem);
  bottom: 1rem;
  width: 3rem;
  background-color: var(--panel-color);
  transition: width var(--transition-speed), padding var(--transition-speed);
  z-index: 1000;
  padding: 0.5rem 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 0 12px 12px 0;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

#menu-toggle {
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: var(--text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color var(--transition-speed);
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 6px;
  min-width: 2rem;
  min-height: 2rem;
}
#menu-toggle:hover {
  background-color: var(--button-hover);
}

#menu-toggle svg {
  width: 25px;
  height: 25px;
  flex-shrink: 0;
}

#sidebar-title {
  font-size: 1.25rem;
  color: var(--text-color);
  font-weight: 600;
  opacity: 0;
  transition: opacity var(--transition-speed);
  white-space: nowrap;
}

.sidebar-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  opacity: 0;
  transition: opacity var(--transition-speed);
}

#sidebar .sidebar-buttons button {
  width: 100%;
  padding: 0.75rem;
  background-color: var(--button-bg);
  color: var(--text-color);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  text-align: left;
  transition: all var(--transition-speed);
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
#sidebar .sidebar-buttons button:hover {
  background-color: var(--button-hover);
  transform: translateX(5px);
}

#sidebar.active {
  width: 18rem;
  padding: 0.75rem 1rem;
}

#sidebar.active #sidebar-title {
  opacity: 1;
}

#sidebar.active .sidebar-buttons {
  opacity: 1;
}

@media(max-width: 768px) {
  #sidebar {
    top: calc(4rem + 0.5rem);
    bottom: 1rem;
    width: 2.5rem;
    padding: 0.5rem 0.25rem;
  }
  #menu-toggle {
    width: 2.5rem;
    height: 2.5rem;
    padding: 0.25rem;
  }
  #menu-toggle svg {
    width: 20px;
    height: 20px;
  }
  #sidebar-title {
    font-size: 1.1rem;
  }
  #sidebar .sidebar-buttons button {
    padding: 0.6rem;
    font-size: 0.85rem;
  }
  #sidebar.active {
    width: 16rem;
    padding: 0.6rem 0.8rem;
  }
}

@media (max-width: 480px) {
  #sidebar {
    top: calc(3.5rem + 0.5rem);
    bottom: 1rem;
    width: 2.25rem;
    padding: 0.4rem 0.2rem;
  }
  #menu-toggle {
    width: 1.75rem;
    height: 1.75rem;
    padding: 0.25rem;
  }
  #menu-toggle svg {
    width: 16px;
    height: 16px;
  }
  #sidebar-title {
    font-size: 1rem;
  }
  #sidebar .sidebar-buttons button {
    padding: 0.5rem;
    font-size: 0.8rem;
  }
  #sidebar.active {
    width: 14rem;
    padding: 0.5rem 0.6rem;
  }
  .sidebar-header {
    margin-bottom: 1rem;
  }
  .sidebar-buttons {
    gap: 0.6rem;
  }
}

@media (max-width: 320px) {
  #sidebar {
    top: calc(3.5rem + 0.5rem);
    bottom: 1rem;
    width: 2rem;
    padding: 0.3rem 0.15rem;
  }
  #menu-toggle {
    width: 1.5rem;
    height: 1.5rem;
    padding: 0.2rem;
  }
  #menu-toggle svg {
    width: 14px;
    height: 14px;
  }
  #sidebar-title {
    font-size: 0.9rem;
  }
  #sidebar .sidebar-buttons button {
    padding: 0.4rem;
    font-size: 0.75rem;
  }
  #sidebar.active {
    width: 12rem;
    padding: 0.4rem 0.5rem;
  }
}

@media (max-width: 768px) {
  #sidebar.active {
    box-shadow: 2px 0 20px rgba(0, 0, 0, 0.5);
  }
}

@media (hover: none) {
  #sidebar .sidebar-buttons button:hover {
    transform: none;
  }
  #sidebar .sidebar-buttons button:active {
    background-color: var(--button-hover);
    transform: scale(0.98);
  }
}
/* ----- /Sidebar ----- */

/* ----- Modal ----- */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--blur-bg);
  backdrop-filter: blur(5px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  animation: fadeIn var(--transition-speed) ease-out;
}

.modal-container {
  background-color: var(--panel-color);
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow: hidden;
  animation: slideIn var(--transition-speed) ease-out;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(79, 195, 247, 0.1);
}

.modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: var(--accent-color);
  font-weight: 600;
}

.modal-close-btn {
  background: none;
  border: none;
  color: var(--text-color);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all var(--transition-speed);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
}
.modal-close-btn:hover {
  background-color: var(--button-hover);
  color: var(--accent-color);
}

.modal-close-btn svg {
  width: 20px;
  height: 20px;
}

.modal-content {
  padding: 2rem;
  overflow-y: auto;
  flex: 1;
  font-size: 1rem;
  line-height: 1.6;
}

.modal-content h3 {
  color: var(--accent-color);
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
}
.modal-content h3:first-child {
  margin-top: 0;
}

.modal-content p {
  margin-bottom: 1rem;
  color: var(--text-color);
}

.modal-content ul, .modal-content ol {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.modal-content li {
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

.modal-content code {
  background-color: var(--input-bg);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  color: var(--accent-color);
}

.modal-content pre {
  background-color: var(--input-bg);
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  margin: 1rem 0;
}

.modal-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  background-color: var(--input-bg);
  border-radius: 6px;
  overflow: hidden;
}

.modal-content th, .modal-content td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-content th {
  background-color: var(--button-bg);
  font-weight: 600;
  color: var(--accent-color);
}

.modal-content .btn {
  display: inline-block;
  background-color: var(--button-bg);
  color: var(--text-color);
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  text-decoration: none;
  cursor: pointer;
  transition: all var(--transition-speed);
  margin: 0.5rem 0.5rem 0.5rem 0;
}
.modal-content .btn:hover {
  background-color: var(--button-hover);
  transform: translateY(-2px);
}

.hidden {
  display: none !important;
}

@keyframes fadeIn {
  from { 
    opacity: 0; 
  }
  to { 
    opacity: 1; 
  }
}

@keyframes slideIn {
  from { 
    opacity: 0; 
    transform: scale(0.9) translateY(-20px); 
  }
  to { 
    opacity: 1; 
    transform: scale(1) translateY(0); 
  }
}

@media (max-width: 768px) {
  .modal-overlay {
    padding: 1rem;
  }
  .modal-container {
    max-width: 100%;
    max-height: 95vh;
  }
  .modal-header {
    padding: 1rem 1.5rem;
  }
  .modal-header h2 {
    font-size: 1.25rem;
  }
  .modal-content {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .modal-overlay {
    padding: 0.5rem;
  }
  .modal-header {
    padding: 1rem;
  }
  .modal-header h2 {
    font-size: 1.1rem;
  }
  .modal-content {
    padding: 1rem;
    font-size: 0.9rem;
  }
  .modal-close-btn {
    width: 2rem;
    height: 2rem;
  }
  .modal-close-btn svg {
    width: 16px;
    height: 16px;
  }
}
/* ----- /Modal ----- */