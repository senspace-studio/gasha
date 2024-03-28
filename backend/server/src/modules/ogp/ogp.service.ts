import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import * as sharp from 'sharp';
import { join } from 'path';

const blue = '#0554F2';

const createTextSVG = async (
  text: string,
  width: number,
  height: number,
  color: string,
  textAnchor: 'start' | 'middle' | 'end',
  fontSize: number,
) => {
  return await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      {
        input: Buffer.from(`
            <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
              <text x="100%" y="50%" dominant-baseline="middle"
                text-anchor="${textAnchor}"
                font-size="${fontSize}"
                fill="${color}"
                font-family="Albert Sans"
              >
                ${text}
              </text>
            </svg>`),
        blend: 'dest-over',
      },
    ])
    .png()
    .toBuffer();
};

@Injectable()
export class OgpService {
  async generateSquareOgp() {
    const totalPoint = 200;

    const items = [
      {
        rareness: 'special',
        points: 100,
        tokens: [
          {
            tokenId: 1,
            quantity: 1,
          },
        ],
      },
      {
        rareness: 'rare',
        points: 100,
        tokens: [
          {
            tokenId: 1,
            quantity: 1,
          },
        ],
      },
      {
        rareness: 'common',
        points: 100,
        tokens: [
          {
            tokenId: 1,
            quantity: 1,
          },
        ],
      },
    ];

    const base = readFileSync(
      join(__dirname, '../../assets/images/ogp/square-base.png'),
    );

    const container = sharp(base);

    const point = await sharp({
      text: {
        text: `<span foreground="${blue}">${totalPoint}</span>`,
        font: 'Albert Sans',
        fontfile: join(__dirname, '../../assets/fonts/AlbertSans-Medium.ttf'),
        rgba: true,
        width: 550,
        height: 90,
      },
    })
      .png()
      .toBuffer();

    const pointLabel = await sharp({
      text: {
        text: `<span foreground="${blue}">$BALL</span>`,
        font: 'Albert Sans',
        fontfile: join(__dirname, '../../assets/fonts/AlbertSans-Regular.ttf'),
        rgba: true,
        width: 150,
        height: 34,
      },
    })
      .png()
      .toBuffer();

    const address = await sharp({
      text: {
        text: `<span foreground="black">0x12...678E</span>`,
        font: 'Albert Sans',
        fontfile: join(__dirname, '../../assets/fonts/AlbertSans-Regular.ttf'),
        rgba: true,
        width: 550,
        height: 28,
      },
    })
      .png()
      .toBuffer();

    const itemsContainer = await Promise.all(
      items.map(async (item, index) => {
        const ballImage = readFileSync(
          join(__dirname, `../../assets/images/ogp/ball_${item.rareness}.png`),
        );
        const ball = await sharp(ballImage).resize(72, 72).png().toBuffer();
        return {
          input: ball,
          left: 50,
          top: 610 + index * 130,
        };
      }),
    );
    const pointsContainer = await Promise.all(
      items.map(async (item, index) => {
        const points = await sharp({
          text: {
            text: `<span foreground="black">${item.points}</span>`,
            font: 'Albert Sans',
            fontfile: join(
              __dirname,
              '../../assets/fonts/AlbertSans-Regular.ttf',
            ),
            rgba: true,
            width: 550,
            height: 40,
          },
        })
          .png()
          .toBuffer();
        return {
          input: points,
          left: 180,
          top: 630 + index * 135,
        };
      }),
    );
    const pointLabelsContainer = await Promise.all(
      items.map(async (item, index) => {
        const points = await sharp({
          text: {
            text: `<span foreground="black">$BALL</span>`,
            font: 'Albert Sans',
            fontfile: join(
              __dirname,
              '../../assets/fonts/AlbertSans-Regular.ttf',
            ),
            rgba: true,
            width: 550,
            height: 20,
          },
        })
          .png()
          .toBuffer();
        return {
          input: points,
          left: 340,
          top: 650 + index * 135,
        };
      }),
    );

    container.composite([
      {
        input: point,
        left: 50,
        top: 250,
      },
      {
        input: pointLabel,
        left: 50,
        top: 357,
      },
      {
        input: address,
        left: 53,
        top: 425,
      },
      ...itemsContainer,
      ...pointsContainer,
      ...pointLabelsContainer,
    ]);

    const buffer = await container.toBuffer();
    return buffer;
  }

  async generateRectangleOgp() {
    const base = readFileSync(
      join(__dirname, '../../assets/images/ogp/rectangle-base.png'),
    );

    const container = sharp(base);

    const pointNum = '20000';
    const point = await createTextSVG(pointNum, 512, 128, blue, 'end', 80);
    const pointLabel = await createTextSVG('$BALL', 150, 64, blue, 'end', 40);
    const address = await createTextSVG(
      '0x12...678E',
      256,
      64,
      'black',
      'end',
      40,
    );

    const items = [
      {
        rareness: 'special',
        points: 100,
        tokens: [
          {
            tokenId: 1,
            quantity: 1,
          },
        ],
      },
      {
        rareness: 'rare',
        points: 100,
        tokens: [
          {
            tokenId: 1,
            quantity: 1,
          },
        ],
      },
      {
        rareness: 'common',
        points: 100,
        tokens: [
          {
            tokenId: 1,
            quantity: 1,
          },
        ],
      },
    ];

    const itemsContainer = await Promise.all(
      items.map(async (item, index) => {
        const ballImage = readFileSync(
          join(__dirname, `../../assets/images/ogp/ball_${item.rareness}.png`),
        );
        const ball = await sharp(ballImage).resize(72, 72).png().toBuffer();
        return {
          input: ball,
          left: 480,
          top: 300 + index * 110,
        };
      }),
    );
    const pointsContainer = await Promise.all(
      items.map(async (item, index) => {
        const point = await createTextSVG(
          item.points.toString(),
          256,
          64,
          'black',
          'end',
          40,
        );
        return {
          input: point,
          left: 480,
          top: 320 + index * 110,
        };
      }),
    );
    const pointLabelsContainer = await Promise.all(
      items.map(async (item, index) => {
        const pointLabel = await createTextSVG(
          '$BALL',
          256,
          64,
          'black',
          'end',
          20,
        );
        return {
          input: pointLabel,
          left: 570,
          top: 320 + index * 110,
        };
      }),
    );

    container.composite([
      {
        input: point,
        left: 740,
        top: 60,
      },
      {
        input: pointLabel,
        left: 1100,
        top: 150,
      },
      {
        input: address,
        left: 1000,
        top: 200,
      },
      ...itemsContainer,
      ...pointsContainer,
      ...pointLabelsContainer,
    ]);

    const buffer = await container.toBuffer();
    return buffer;
  }
}
