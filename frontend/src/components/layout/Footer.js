import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
    footer: {
        padding: theme.spacing(2, 4),
        marginTop: 'auto',
        backgroundColor: theme.palette.primary.main,
        position: 'fixed',
        left:0,
        bottom: 0,
        width: '100%',
        textAlign: 'center'
    },
    copyrightText: {
        margin: theme.spacing(0, 'auto')
    }
}))

export default function Footer(){
  const classes = useStyles();

  return(
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <Typography variant="body2" color="textSecondary" className={classes.copyrightText}>
          {'Copyright ©'}{' '}
          <Link color="inherit" href="http://bjcodes.com">
              Bhagirthi Jhamb
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </footer>
  )
}