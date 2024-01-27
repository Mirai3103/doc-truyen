CREATE TABLE phim(
  ma_phim INT NOT NULL,
  ten_phim VARCHAR(255) NOT NULL,
  mo_ta TEXT,
  ma_the_loai INT NOT NULL,
  PRIMARY KEY(ma_phim)
);

CREATE TABLE the_loai(
ma_the_loai INT NOT NULL, ten_the_loai VARCHAR(255) NOT NULL,
  PRIMARY KEY(ma_the_loai)
);

CREATE TABLE rap_phim(
  ma_rap INT NOT NULL,
  ten_rap VARCHAR(255) NOT NULL,
  dia_chi VARCHAR(255) NOT NULL,
  PRIMARY KEY(ma_rap)
);

CREATE TABLE phong(
  ma_phong INT NOT NULL,
  ten_phong VARCHAR(255) NOT NULL,
  ma_rap INT NOT NULL,
  so_cot INT,
  so_hang INT,
  PRIMARY KEY(ma_phong)
);

CREATE TABLE ghe(
  ma_ghe INT NOT NULL,
  ma_phong INT NOT NULL,
  `cot` INT NOT NULL,
  hang INT NOT NULL,
  ma_loai_ghe INT NOT NULL,
  PRIMARY KEY(ma_ghe)
);

CREATE TABLE loai_ghe(
  ma_loai_ghe INT NOT NULL,
  ten_loai_ghe VARCHAR(255) NOT NULL,
  gia_ghe INT NOT NULL,
  PRIMARY KEY(ma_loai_ghe)
);

CREATE TABLE xuat_chieu(
  ma_xuat_chieu INT NOT NULL,
  thoi_gian_chieu DATETIME NOT NULL,
  ma_phong INT NOT NULL,
  ma_phim INT NOT NULL,
  PRIMARY KEY(ma_xuat_chieu)
);

CREATE TABLE dat_cho(
  ma_dat_cho INT NOT NULL,
  ma_nguoi_dung INT NOT NULL,
  ma_xuat_chieu INT NOT NULL,
  trang_thai VARCHAR NOT NULL,
  PRIMARY KEY(ma_dat_cho)
);

CREATE TABLE chi_tiet_dat_cho(
  ma_chi_tiet_dat_cho INT NOT NULL,
  ma_dat_cho INT NOT NULL,
  ma_ghe INT NOT NULL,
  PRIMARY KEY(ma_chi_tiet_dat_cho)
);

CREATE TABLE `user`(user_id INT NOT NULL, PRIMARY KEY(user_id));

ALTER TABLE phim
  ADD CONSTRAINT ma_the_loai_ma_the_loai
    FOREIGN KEY (ma_the_loai) REFERENCES the_loai (ma_the_loai) ON DELETE Cascade
      ON UPDATE Cascade;

ALTER TABLE phong
  ADD CONSTRAINT ma_rap_ma_rap
    FOREIGN KEY (ma_rap) REFERENCES rap_phim (ma_rap) ON DELETE Cascade
      ON UPDATE Cascade;

ALTER TABLE ghe
  ADD CONSTRAINT ma_loai_ghe_ma_loai_ghe
    FOREIGN KEY (ma_loai_ghe) REFERENCES loai_ghe (ma_loai_ghe) ON DELETE Cascade
      ON UPDATE Cascade;

ALTER TABLE ghe
  ADD CONSTRAINT ma_phong_ma_phong
    FOREIGN KEY (ma_phong) REFERENCES phong (ma_phong) ON DELETE Cascade
      ON UPDATE Cascade;

ALTER TABLE xuat_chieu
  ADD CONSTRAINT ma_phong_ma_phong
    FOREIGN KEY (ma_phong) REFERENCES phong (ma_phong) ON DELETE Cascade
      ON UPDATE Cascade;

ALTER TABLE xuat_chieu
  ADD CONSTRAINT ma_phim_ma_phim
    FOREIGN KEY (ma_phim) REFERENCES phim (ma_phim) ON DELETE Cascade
      ON UPDATE Cascade;

ALTER TABLE dat_cho
  ADD CONSTRAINT ma_xuat_chieu_ma_xuat_chieu
    FOREIGN KEY (ma_xuat_chieu) REFERENCES xuat_chieu (ma_xuat_chieu)
      ON DELETE Cascade ON UPDATE Cascade;

ALTER TABLE chi_tiet_dat_cho
  ADD CONSTRAINT ma_dat_cho_ma_dat_cho
    FOREIGN KEY (ma_dat_cho) REFERENCES dat_cho (ma_dat_cho) ON DELETE Cascade
      ON UPDATE Cascade;

ALTER TABLE chi_tiet_dat_cho
  ADD CONSTRAINT ma_ghe_ma_ghe
    FOREIGN KEY (ma_ghe) REFERENCES ghe (ma_ghe) ON DELETE Cascade ON UPDATE Cascade
  ;

ALTER TABLE dat_cho
  ADD CONSTRAINT user_id_ma_nguoi_dung
    FOREIGN KEY (ma_nguoi_dung) REFERENCES `user` (user_id) ON DELETE Cascade
      ON UPDATE Cascade;
