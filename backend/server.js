const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors'); // 允许跨域请求

const app = express();
const port = process.env.PORT || 3000;

// 允许跨域请求
app.use(cors());

// 解析 JSON 请求
app.use(bodyParser.json());

// 连接 MongoDB
mongoose.connect('mongodb+srv://Raymond:Woaini-553@imy220.yr2vj.mongodb.net/playlistSharingApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB", err));

// User Schema
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    friends: Array,
});

const User = mongoose.model('User', userSchema);

// Song Schema
const songSchema = new mongoose.Schema({
    title: String,
    artist: String,
    album: String,
    duration: String,
    image: String
});

const Song = mongoose.model('Song', songSchema);

// 注册 API
app.post('/api/signup', async (req, res) => {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        email,
        password: hashedPassword,
        friends: [],
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
});

// 登录 API
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user._id }, 'your_secret_key', { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
});

// 获取所有歌曲
app.get('/api/songs', async (req, res) => {
    try {
        const songs = await Song.find();
        res.status(200).json(songs);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching songs' });
    }
});

// 新增歌曲
app.post('/api/songs', async (req, res) => {
    const { title, artist, album, duration, image } = req.body;
    const newSong = new Song({ title, artist, album, duration, image });

    try {
        await newSong.save();
        res.status(201).json(newSong); // 返回新添加的歌曲数据
    } catch (err) {
        res.status(500).json({ message: 'Error adding song' });
    }
});

// 修改歌曲
app.put('/api/songs/:id', async (req, res) => {
    const { id } = req.params;
    const { title, artist, album, duration, image } = req.body;

    try {
        const updatedSong = await Song.findByIdAndUpdate(id, { title, artist, album, duration, image }, { new: true });
        if (!updatedSong) return res.status(404).json({ message: 'Song not found' });
        res.status(200).json(updatedSong);
    } catch (err) {
        res.status(500).json({ message: 'Error updating song' });
    }
});

// 删除歌曲
app.delete('/api/songs/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedSong = await Song.findByIdAndDelete(id);
        if (!deletedSong) return res.status(404).json({ message: 'Song not found' });
        res.status(200).json({ message: 'Song deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting song' });
    }
});

// 获取用户信息
app.get('/api/user/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching user data' });
    }
});

// 更新用户信息的 API
app.put('/api/user/:email', async (req, res) => {
    try {
        const { gender, dateOfBirth, country } = req.body;

        // 使用 findOneAndUpdate 更新用户数据
        const updatedUser = await User.findOneAndUpdate(
            { email: req.params.email },
            {
                gender, // 确保与数据库字段一致
                dateOfBirth, // 确保与数据库字段一致
                country, // 确保与数据库字段一致
            },
            { new: true } // 返回更新后的数据
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser); // 返回更新后的用户数据
    } catch (err) {
        res.status(500).json({ message: 'Error updating user data' });
    }
});



// 定义 Playlist 和 Song 的 Schema
const playlistSchema = new mongoose.Schema({
    name: String,
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }], // 使用 ObjectId 关联到 Song 集合
    email: String
});

const Playlist = mongoose.model('Playlist', playlistSchema);

// 获取特定的 playlist 并填充歌曲信息
app.get('/api/playlists/:id', async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id).populate('songs');
        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }
        res.status(200).json(playlist);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching playlist' });
    }
});

// 向播放列表中添加歌曲
app.put('/api/playlists/:id/add-song', async (req, res) => {
    const { songId } = req.body;
    try {
        const playlist = await Playlist.findById(req.params.id);
        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }
        // 检查是否已经有该歌曲
        if (!playlist.songs.includes(songId)) {
            playlist.songs.push(songId);
            await playlist.save();
        }
        res.status(200).json(playlist);
    } catch (error) {
        res.status(500).json({ message: 'Error adding song to playlist' });
    }
});

// 向播放列表中删除歌曲
app.put('/api/playlists/:id/remove-song', async (req, res) => {
    const { songId } = req.body;
    try {
        const playlist = await Playlist.findById(req.params.id);
        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        // 从播放列表中移除歌曲，先检查是否为 null 再进行比较
        playlist.songs = playlist.songs.filter(song => song && song.toString() !== songId);
        await playlist.save();
        res.status(200).json(playlist);
    } catch (error) {
        console.error('Error removing song from playlist:', error); // 打印错误信息
        res.status(500).json({ message: 'Error removing song from playlist' });
    }
});


// 创建新播放列表的 API
app.post('/api/playlists', async (req, res) => {
    const { name, email } = req.body; // 从请求体中获取播放列表的名称和用户email
    const newPlaylist = new Playlist({
        name,
        songs: [], // 初始时播放列表为空
        email: email || 'u19194839@example.com', // 默认用户email，如果没有传递
    });

    try {
        const savedPlaylist = await newPlaylist.save();
        res.status(201).json(savedPlaylist);
    } catch (error) {
        res.status(500).json({ message: 'Error creating playlist' });
    }
});

// 获取所有播放列表
app.get('/api/playlists', async (req, res) => {
    try {
        const playlists = await Playlist.find();
        res.status(200).json(playlists);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching playlists' });
    }
});

// 删除播放列表
app.delete('/api/playlists/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPlaylist = await Playlist.findByIdAndDelete(id);
        if (!deletedPlaylist) return res.status(404).json({ message: 'Playlist not found' });
        res.status(200).json({ message: 'Playlist deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting playlist' });
    }
});





// 设置静态文件服务
app.use(express.static(path.join(__dirname, '../frontend/public')));

// 捕获所有其他路由并返回前端 index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/public', 'index.html'));
});

// 启动服务器
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
