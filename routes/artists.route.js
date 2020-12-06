const artists_service = require('../services/artists.service');
const express = require('express');

const router = express.Router();
const asyncHandler = require('express-async-handler');

router.get(
  '/artists/names',
  asyncHandler(async (req, res, next) => {
    let result = await artists_service.getArtistNames();
    const names = result[0].names.filter(
      (value) =>
        !value.match(
          /[-&+$*)(/:.º?óıäíÜüè\\çñàúïÅôş’ãřö;®ýØø´âčěžš`îőÿêëåò〜☆ůČō–Àłì_|œÏÍŮńõßżę✰死人•^¡ÁÉéÑÓáÖğİŚīāăŠćŽΆλκηςΠαγώνΜπέΈΣοφρωίυΑάιΤμύθσΕεόδϊήτΚβξΖΒΔΧΘΝζχΓΙΛΡΦΗΟАнатолийПпвБьшдескхрЦгяВюзДмШчИуыб«М»СОТЛЭРХэثرياحلمىجفكعبدغنسصتوزชยุดีวสานท์“”イエロー・マジックバンドオメガトラブサザルスタズセキシゲハワダケ于璇余天優客李林冉肖玲劉蘭包妮娜周姚莉小虎隊尤雅崔萍左艷蓉巫啟賢席幸福合唱團康丁張洪量淑美琍敏琪艾嘉露彭家麗徐珮華施京子明星服部爵士大樂佩菁壽全安和建復清風芬慧隆楊燕水柳仙湯寶如花潘邦越雲物語リ王利名夢麟秀秋玉環球管弦群甜心女聲白光居良元薫童格笠井紀紫薇羅佑舒芳葉歡葛蔡楓蔣志藍戰虞戡平謝雷賴霞辛曉那英鄒森鄭怡金智娟鈴木弘陳男霜雪韋綺珊高君鳳飛黃品源國蜀黑豹]/
        )
    );
    res.send(names);
  })
);

router.get(
  '/artists/stats',
  asyncHandler(async (req, res, next) => {
    const tracks = await artists_service.artistAverageStdDev([
      'acousticness',
      'danceability',
      'energy',
      'instrumentalness',
      'liveness',
      'speechiness',
      'valence',
    ]);
    res.send(tracks);
  })
);

router.get(
  '/artists/:name',
  asyncHandler(async (req, res, next) => {
    const { name } = req.params;
    const artist = await artists_service.getArtist(name);
    res.send(artist);
  })
);

module.exports = router;
