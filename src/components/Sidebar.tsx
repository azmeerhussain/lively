import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Logo from './Logo';
import ProfileModal from './ProfileModal';
import styles from './Sidebar.module.css';
import AchievementsModal from './AchievementsModal';
import EditAvatarModal from './EditAvatarModal';
import { type Progress, type Item } from '../types/app';

const Sidebar = () => {
  const {userId} = useParams();
  const {user, loading} = useAuth();
  // Modal visibility states
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [progress, setProgress] = useState<Progress>();
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);

  // Generates initials (e.g., "AH" for Azmeer Hussain) for the fallback profile icon
  const getInitials = (name: string | undefined) => {
    if (!name) return "??";
      const parts = name.trim().split(' ');
      if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
      return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    };
  
  // Local state for avatar customization to allow "previewing" before saving to DB
  const [avatarColor, setAvatarColor] = useState<string>(user?.avatar.skin || "#ffd76b");
  const [items, setItems] = useState<Item[]>([]);



  const navigate = useNavigate();
  const location = useLocation();

  // Defines the main navigation structure
  const navItems = [
    { name: 'Dashboard', path: `/app/${user?.userId}/dashboard/`, icon: '🏠' },
    { name: 'Schedule', path: `/app/${user?.userId}/schedule`, icon: '📅' },
    { name: 'Achievements', path: `${window.location.href}`, icon: '🏆' },
  ];
  
  // Closes profile before opening avatar editor to prevent modal stacking issues
  const handleEditAvatar = () => {
    setIsProfileOpen(false);
    setIsAvatarOpen(true);
  };

  // Syncs local customization state with the latest user data from AuthContext
  useEffect(() => {
    if (user?.avatar) {
      setAvatarColor(user.avatar.skin);
      setItems(user.avatar.items);
    }
    const fetchProgression = async () => {
        try{
          const res = await fetch(`/api/users/progress/${userId}`, {
            method: "GET"
          });
          
          if(!res.ok) throw new Error("Failed to fetch");
          const data = await res.json();
          setProgress(data);
        } catch(err){
          console.error(err);
        }
      }
      if(userId) fetchProgression();
  }, [user]); 

  // Updates specific item colors (e.g., clothing) in the local preview state
  const changeItemColor = (color:string, id: string) => {
    setItems(prev => 
      prev.map(item => 
        item.id === id ? {...item, color: color} : item
      )
    )
  }

  // Persists local avatar changes to the backend API
  const saveAvatar = async () => {
    try {
      const response = await fetch(`/api/users/${user?.userId}/save-avatar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "skin": avatarColor,
          "items": items
        })
      });
      if(response.ok){
        console.log("Avatar Saved Successfully");
        setIsAvatarOpen(false);
      }
    } catch(error){
      console.error("Network error: ", error);
    }
  }

  if(loading) return <p>Loading...</p>
  if(!user || !progress) return <p>User not found...</p>
  return (
    <>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarContent}>
          <div className={styles.logoContainer}><Logo /></div>
          <nav className={styles.navStack}>
            <ul>
              {navItems.map((item) => (
                <li 
                  key={item.path}
                  className={location.pathname === item.path ? styles.active : ''}
                  onClick={() => item.name === 'Achievements' ? setIsAchievementsOpen(true) : navigate(item.path)}
                >
                  <span className={styles.icon}>{item.icon}</span>
                  <span className={styles.navText}>{item.name}</span>
                </li>
              ))}
            </ul>
          </nav>
          {/* Bottom section handles the user profile access point */}
          <div className={styles.sidebarBottom}>
            <div className={styles.userProfile} onClick={() => setIsProfileOpen(true)}>
              <div className={styles.avatar}>{getInitials(user?.name)}</div>
              <span className={styles.userName}>{user?.name}</span>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Portals for Modals: Kept outside the <aside> for cleaner rendering */}
      <ProfileModal 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)}
        level={progress.level}
        xp={progress.xp}
        name={user.name} 
        onEditAvatar={handleEditAvatar}
        currentColor={avatarColor} 
        items={items}
      />
      <AchievementsModal 
        isOpen={isAchievementsOpen} 
        onClose={() => setIsAchievementsOpen(false)} 
      />
      <EditAvatarModal 
        isOpen={isAvatarOpen} 
        onClose={() => setIsAvatarOpen(false)} 
        saveChanges={saveAvatar}
        userXp={progress.xp}
        currentColor={avatarColor}
        onColorChange={setAvatarColor}
        items= {items}
        onItemColorChange={changeItemColor}
      />
    </>
  );
};

export default Sidebar;