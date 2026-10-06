import React from 'react';
import ReactDOM from 'react-dom';
import styles from './EditAvatarModal.module.css';
import HeroAvatar from './HeroAvatar';
import type { Item } from '../types/app';

interface EditAvatarModalProps {
  isOpen: boolean;
  onClose: () => void;
  saveChanges: () => void;
  userXp: number;
  currentColor: string;
  onColorChange: (color: string) => void;
  onItemColorChange: (color: string, type: string) => void;
  items: Item[];
}

const EditAvatarModal: React.FC<EditAvatarModalProps> = ({
  isOpen, onClose, userXp, saveChanges,
  currentColor, onColorChange, items, onItemColorChange
}) => {
  // Color palettes defined with XP thresholds for progression
  const skinColors = [
    { hex: "#ffd76b", minXP: 0 },
    { hex: "#4A90E2", minXP: 200 },
    { hex: "#ff0000", minXP: 500 },
    { hex: "#A29BFE", minXP: 2000 },
    { hex: "#FAB1A0", minXP: 5000 }
  ];

  const clothingColors = [
    { hex: "#ededed", minXP: 0 },
    { hex: "#4A90E2", minXP: 200 },
    { hex: "#ff0000", minXP: 500 },
    { hex: "#333333", minXP: 2000 },
    { hex: "#FFD700", minXP: 5000 }
  ];

  if (!isOpen) return null;

  // Render modal into document body to escape parent stacking contexts
  return ReactDOM.createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>&times;</button>
        <div className={styles.modalBody}>
          <div className={styles.previewSection}>
            <div className={styles.previewCircle}>
              <HeroAvatar
                className={styles.previewHero}
                primaryColor={currentColor}
                items={items}
              />
            </div>
            <h3 className={styles.previewTitle}>Character Preview</h3>
          </div>

          <div className={styles.optionsSection}>
            <h2 className={styles.modalTitle}>Edit Avatar</h2>
            <p className={styles.description}>Select items to change your look.</p>

            <div className={styles.scrollArea}>
              <div className={styles.optionCategory}>
                <span>Skin Color</span>
                <div className={styles.colorRow}>
                  {skinColors.map((color) => {
                    const isLocked = userXp < color.minXP;
                    return (
                      <div
                        key={color.hex}
                        className={`${styles.colorCircle} ${currentColor === color.hex ? styles.active : ""} ${isLocked ? styles.locked : ""}`}
                        style={{ backgroundColor: color.hex }}
                        onClick={() => !isLocked && onColorChange(color.hex)}
                        data-xp={isLocked ? `${color.minXP} XP` : ""}
                      >
                        {isLocked && <span className={styles.lockIcon}>🔒</span>}
                      </div>
                    );
                  })}
                </div>
              </div>

              {items.map(item => {
                return (
                  <div key={item.id} className={styles.optionCategory}>
                    <span>{item.name}</span>
                    <div className={styles.colorRow}>
                      <div className={`${styles.resetCircle} ${item.color === "#ffffff" ? styles.active : ""}`}
                        onClick={() => onItemColorChange("#ffffff", item.id)}>✕</div>
                      {clothingColors.map((color) => {
                        const isLocked = userXp < color.minXP;
                        return (
                          <div
                            key={color.hex}
                            className={`${styles.colorCircle} ${item.color === color.hex ? styles.active : ""} ${isLocked ? styles.locked : ""}`}
                            style={{ backgroundColor: color.hex }}
                            onClick={() => !isLocked && onItemColorChange(color.hex, item.id)}
                            data-xp={isLocked ? `${color.minXP} XP` : ""}
                          >
                            {isLocked && <span className={styles.lockIcon}>🔒</span>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )
              })}
            </div>

            <button className={styles.saveButton} onClick={saveChanges}>Save Changes</button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default EditAvatarModal;