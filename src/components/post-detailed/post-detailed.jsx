import { Avatar, Box, Button, CardActions, CardContent, CardHeader, CardMedia, Grid, Typography } from '@mui/material';
import s from './styles.module.css';
import 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { ReactComponent as LikeIcon } from '../../images/save.svg';
import cn from "classnames";
import { useNavigate } from 'react-router';
import { Link, useLocation } from "react-router-dom";
import { isLiked } from '../../utils/post';
import { Delete as DeleteIcon} from '@mui/icons-material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
dayjs.locale('ru');
dayjs.extend(relativeTime)

function PostDetailed({ image, title, text, author, created_at, user, likes, _id, onPostLike, tags, comments, onDelete, onEdit }) {

  const navigate = useNavigate();
  const location = useLocation();
  const initialPath = location.state?.initialPath;
  const like = isLiked(likes, user?._id);
  const canDelete = user?._id === author?._id;

  function handleClickButtonLike() {
    onPostLike({ likes, _id })
  }

  function handleClickDelete() {
    onDelete({ _id });
  }
  function handleClickEdit() {
    onEdit()
  }
  
  return (
    <Grid className={s.wrapper} container spacing={0}>
      <Grid item xs={12} md={12}>
        <Button variant="outlined" size="small" onClick={() => { navigate(-1) }} sx={{ margin: '0.5rem 1rem 1rem 0' }}>
          Назад
        </Button>
        {canDelete && <Button variant="outlined" size="small" onClick={handleClickDelete} sx={{ margin: '0.5rem 1rem 1rem 0' }} >
         <DeleteIcon /> Удалить пост </Button>
         }
         {canDelete && 
         <Link to={{pathname:`/edit/${_id}`}} replace state={{ backgroundLocation: {...location, state: null}, initialPath, postId:_id}}>
          <Button onClick={handleClickEdit} variant="outlined" size="small"  sx={{ margin: '0.5rem 1rem 1rem 0' }} >
         <ModeEditIcon /> Редактировать пост </Button>
         </Link>
         
         }
      </Grid>

      <Grid item xs={12} md={8}>

        <div className={s.imgWrapper}>
          <CardMedia
            component="img"
            height="auto"
            image={image}
            alt={title}
          />
        </div>
      </Grid>
      <Grid item xs={12} md={4}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" src={author?.avatar}>

            </Avatar>
          }
          title={`${author?.name} ${author?.about}`}
          subheader={dayjs(created_at).fromNow()}
        />
        <CardContent>
          <Typography variant='h5' component="h3" gutterBottom>{title}</Typography>
          <Typography variant="body2" color="text.secondary" component="p" >
            {text}
          </Typography>
          <CardActions>
            <button className={cn(s.favorite, { [s.favoriteActive]: like })} onClick={handleClickButtonLike}>
              <LikeIcon />
            </button>
            {likes?.length !== 0 && <div className={s.likes}>{likes?.length}</div>}
            {tags?.length !== 0 && <div >
              {tags?.map((el, index) => {
                return <span key={index} className={s.tags}>{el = `#${el} `}</span>
              })}
            </div>
            }
          </CardActions>
          {comments?.map((item) => (
            <p key={item._id}>
              {item.author.name}: {item.text}
            </p>
          ))}
        </CardContent>
      </Grid>
    </Grid>
  )
}
export default PostDetailed;

