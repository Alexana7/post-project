import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, Typography } from "@mui/material"
import { ExpandMore as ExpandMoreIcon, Favorite as FavoriteIcon, MoreVert as MoreVertIcon, Share as ShareIcon } from '@mui/icons-material';

import { useState } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import s from './post.module.css';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';



dayjs.locale('ru');
dayjs.extend(relativeTime)




export const Post = ({ image, title, text, created_at, author}) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Grid2 item sx={{ display: 'flex' }} xs={12} sm={6} md={4} lg={3} >
            <Card className={s.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" src={author.avatar}>
                            {author.email.slice(0, 1).toUpperCase()}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={author.email}
                    subheader={dayjs(created_at).fromNow()}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={image}
                    alt={title}
                />
                <CardContent>
                    <Typography variant='h5' component="h3" gutterBottom>{title}</Typography>
                    <Typography variant="body2" color="text.secondary" component="p" noWrap>
                        {text}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing sx={{ marginTop: 'auto' }}>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton
                        sx={{
                            transform: !expanded ? 'rotate(0deg)' : 'rotate(180deg)',
                            marginLeft: 'auto',
                        }}
                        onClick={handleExpandClick}
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>
                            {text}
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </Grid2>
    )
}