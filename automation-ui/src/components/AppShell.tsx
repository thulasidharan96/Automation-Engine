import type { PropsWithChildren } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import {
  type BrandVariants,
  createLightTheme,
  createDarkTheme,
  FluentProvider,
  tokens,
  Avatar,
  Toolbar,
  ToolbarButton,
  Tooltip,
  Text,
  makeStyles,
  Dialog,
  DialogSurface,
  DialogBody,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
} from '@fluentui/react-components';
import { SignOut24Regular, Person24Regular, Navigation24Regular } from '@fluentui/react-icons';
import { useState } from 'react';
import { useAutomationStudio } from '../state/store';

const brand: BrandVariants = {
  10: '#020305',
  20: '#111723',
  30: '#16263D',
  40: '#19324D',
  50: '#1B3F5F',
  60: '#1F4F78',
  70: '#215F90',
  80: '#2870AF',
  90: '#2B88D8',
  100: '#479EF5',
  110: '#62ABF5',
  120: '#77B7F7',
  130: '#96C6FA',
  140: '#B4D6FA',
  150: '#D5E6FB',
  160: '#EFF6FF',
};

const lightTheme = createLightTheme(brand);
const darkTheme = createDarkTheme(brand);

const useStyles = makeStyles({
  layout: {
    display: 'grid',
    gridTemplateRows: '56px 1fr',
    gridTemplateColumns: '280px 1fr',
    gridTemplateAreas: `"header header" "nav main"`,
    minHeight: '100vh',
    '@media (max-width: 900px)': {
      gridTemplateColumns: '1fr',
      gridTemplateRows: '56px 1fr',
      gridTemplateAreas: `"header" "main"`,
    },
  },
  header: {
    gridArea: 'header',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingInline: tokens.spacingHorizontalM,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  nav: {
    gridArea: 'nav',
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: tokens.spacingHorizontalM,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
    '@media (max-width: 900px)': {
      display: 'none',
    },
  },
  main: {
    gridArea: 'main',
    padding: tokens.spacingHorizontalL,
    '@media (max-width: 600px)': {
      padding: tokens.spacingHorizontalM,
    },
  },
  navLink: {
    textDecorationLine: 'none',
    padding: '8px 12px',
    borderRadius: tokens.borderRadiusMedium,
    color: tokens.colorNeutralForeground2,
    ':hover': { backgroundColor: tokens.colorSubtleBackgroundHover },
    '&.active': { backgroundColor: tokens.colorSubtleBackgroundSelected, color: tokens.colorNeutralForeground1 },
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
  },
  menuButton: {
    display: 'none',
    '@media (max-width: 900px)': { display: 'inline-flex' },
  },
});

export function AppShell({ children }: PropsWithChildren) {
  const styles = useStyles();
  const theme = useAutomationStudio((s) => s.theme);
  const user = { name: 'Demo User', email: 'demo@example.com' };
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <FluentProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <div className={styles.layout}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <Button
              className={styles.menuButton}
              appearance="subtle"
              icon={<Navigation24Regular />}
              aria-label="Open navigation"
              onClick={() => setMobileNavOpen(true)}
            />
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
              <Avatar name="Flow" color="colorful" />
              <Text weight="semibold">Automation Studio</Text>
            </Link>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Tooltip content={user?.email ?? ''} relationship="label">
              <Avatar name={user?.name ?? 'User'} />
            </Tooltip>
            <Toolbar>
              <ToolbarButton aria-label="Profile" icon={<Person24Regular />} as="a" href="#/profile" />
              <ToolbarButton aria-label="Sign out" icon={<SignOut24Regular />} as="a" href="#/login" />
            </Toolbar>
          </div>
        </header>
        <nav className={styles.nav}>
          <NavLink className={styles.navLink} to="/dashboard">Dashboard</NavLink>
          <NavLink className={styles.navLink} to="/gallery">Templates</NavLink>
          <NavLink className={styles.navLink} to="/automations">My Automations</NavLink>
          <NavLink className={styles.navLink} to="/designer">Designer</NavLink>
          <NavLink className={styles.navLink} to="/profile">Profile</NavLink>
        </nav>
        <main className={styles.main}>
          {children ?? <Outlet />}
        </main>
        <Dialog open={mobileNavOpen} onOpenChange={(_, d) => setMobileNavOpen(!!d.open)} modalType="modal">
          <DialogSurface>
            <DialogBody>
              <DialogTitle>Menu</DialogTitle>
              <DialogContent>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 8 }}>
                  <a className={styles.navLink} href="#/dashboard" onClick={() => setMobileNavOpen(false)}>Dashboard</a>
                  <a className={styles.navLink} href="#/gallery" onClick={() => setMobileNavOpen(false)}>Templates</a>
                  <a className={styles.navLink} href="#/automations" onClick={() => setMobileNavOpen(false)}>My Automations</a>
                  <a className={styles.navLink} href="#/designer" onClick={() => setMobileNavOpen(false)}>Designer</a>
                  <a className={styles.navLink} href="#/profile" onClick={() => setMobileNavOpen(false)}>Profile</a>
                </div>
              </DialogContent>
              <DialogActions>
                <Button appearance="secondary" onClick={() => setMobileNavOpen(false)}>Close</Button>
              </DialogActions>
            </DialogBody>
          </DialogSurface>
        </Dialog>
      </div>
    </FluentProvider>
  );
}
