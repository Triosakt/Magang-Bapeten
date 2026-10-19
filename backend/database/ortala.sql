-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 19, 2026 at 04:58 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ortala`
--

-- --------------------------------------------------------

--
-- Table structure for table `berita`
--

CREATE TABLE `berita` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `judul` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `isi` text NOT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `tempat` varchar(255) DEFAULT NULL,
  `status` enum('draft','published','archived') NOT NULL DEFAULT 'draft',
  `tanggal_publikasi` date DEFAULT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `berita_media`
--

CREATE TABLE `berita_media` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `berita_id` bigint(20) UNSIGNED NOT NULL,
  `file` varchar(255) NOT NULL,
  `type` enum('image','video') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cfm`
--

CREATE TABLE `cfm` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `peta_proses_id` bigint(20) UNSIGNED NOT NULL,
  `sub_proses_id` bigint(20) UNSIGNED NOT NULL,
  `nomor_cfm` varchar(255) NOT NULL,
  `nama_cfm` text NOT NULL,
  `tahun_terbit` year(4) NOT NULL,
  `file_pdf` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cfm_unit_kerja`
--

CREATE TABLE `cfm_unit_kerja` (
  `cfm_id` bigint(20) UNSIGNED NOT NULL,
  `unit_kerja_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `keterangan`
--

CREATE TABLE `keterangan` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama_keterangan` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `keterangan`
--

INSERT INTO `keterangan` (`id`, `nama_keterangan`) VALUES
(1, 'Proses Inti'),
(2, 'Proses Pendukung'),
(3, 'Proses Lainnya');

-- --------------------------------------------------------

--
-- Table structure for table `lembaga`
--

CREATE TABLE `lembaga` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `kode` varchar(30) NOT NULL,
  `nama_lembaga` varchar(255) NOT NULL,
  `deskripsi` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `lembaga`
--

INSERT INTO `lembaga` (`id`, `kode`, `nama_lembaga`, `deskripsi`, `created_at`, `updated_at`) VALUES
(1, 'BAPETEN', 'Badan Pengawas Tenaga Nuklir', NULL, '2026-10-19 02:57:26', '2026-10-19 02:57:26');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `type` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `message` text DEFAULT NULL,
  `sop_id` bigint(20) UNSIGNED DEFAULT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pengumuman`
--

CREATE TABLE `pengumuman` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `judul` varchar(255) NOT NULL,
  `file` varchar(255) DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `tanggal_pengumuman` date NOT NULL,
  `tanggal_kadaluarsa` date DEFAULT NULL,
  `status` enum('aktif','tidak_aktif') NOT NULL DEFAULT 'aktif',
  `created_by` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `peta_proses`
--

CREATE TABLE `peta_proses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `keterangan_id` bigint(20) UNSIGNED NOT NULL,
  `nomor_peta_proses` varchar(255) NOT NULL,
  `judul` varchar(255) NOT NULL,
  `tahun_terbit` year(4) NOT NULL,
  `file_pdf` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `peta_proses_unit_kerja`
--

CREATE TABLE `peta_proses_unit_kerja` (
  `peta_proses_id` bigint(20) UNSIGNED NOT NULL,
  `unit_kerja_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sop`
--

CREATE TABLE `sop` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `jenis_sop` enum('lembaga','unit_kerja') NOT NULL,
  `lembaga_id` bigint(20) UNSIGNED DEFAULT NULL,
  `unit_kerja_id` bigint(20) UNSIGNED DEFAULT NULL,
  `peta_proses_id` bigint(20) UNSIGNED DEFAULT NULL,
  `sub_proses_id` bigint(20) UNSIGNED DEFAULT NULL,
  `cfm_id` bigint(20) UNSIGNED DEFAULT NULL,
  `nomor_sop` varchar(255) NOT NULL,
  `nama_sop` varchar(255) NOT NULL,
  `tahun_terbit` year(4) NOT NULL,
  `status_berlaku` enum('Berlaku','Tidak_Berlaku') NOT NULL DEFAULT 'Berlaku',
  `approval_status` enum('draft','pending','approved','rejected') NOT NULL DEFAULT 'pending',
  `versi` varchar(10) NOT NULL DEFAULT '1.0',
  `file` varchar(255) DEFAULT NULL,
  `uploaded_by` bigint(20) UNSIGNED NOT NULL,
  `approved_by` bigint(20) UNSIGNED DEFAULT NULL,
  `approved_at` timestamp NULL DEFAULT NULL,
  `reject_reason` text DEFAULT NULL,
  `download_count` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ;

-- --------------------------------------------------------

--
-- Table structure for table `sop_approval_log`
--

CREATE TABLE `sop_approval_log` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sop_id` bigint(20) UNSIGNED NOT NULL,
  `action` enum('submitted','approved','rejected','revised') NOT NULL,
  `actor_id` bigint(20) UNSIGNED NOT NULL,
  `catatan` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sub_proses`
--

CREATE TABLE `sub_proses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `peta_proses_id` bigint(20) UNSIGNED NOT NULL,
  `nomor_sub_proses` varchar(255) NOT NULL,
  `nama_sub_proses` varchar(255) NOT NULL,
  `tahun_terbit` year(4) NOT NULL,
  `file_pdf` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sub_proses_unit_kerja`
--

CREATE TABLE `sub_proses_unit_kerja` (
  `sub_proses_id` bigint(20) UNSIGNED NOT NULL,
  `unit_kerja_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `unit_kerja`
--

CREATE TABLE `unit_kerja` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `lembaga_id` bigint(20) UNSIGNED DEFAULT NULL,
  `nama_unit` varchar(255) NOT NULL,
  `singkatan` varchar(50) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `unit_kerja`
--

INSERT INTO `unit_kerja` (`id`, `lembaga_id`, `nama_unit`, `singkatan`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 1, 'Kepala BAPETEN', NULL, 1, '2026-10-19 02:57:26', '2026-10-19 02:57:26'),
(2, 1, 'Deputi PI', NULL, 1, '2026-10-19 02:57:26', '2026-10-19 02:57:26'),
(3, 1, 'Deputi PKN', NULL, 1, '2026-10-19 02:57:26', '2026-10-19 02:57:26'),
(4, 1, 'Sestama', NULL, 1, '2026-10-19 02:57:26', '2026-10-19 02:57:26'),
(5, 1, 'DPFRZR', NULL, 1, '2026-10-19 02:57:26', '2026-10-19 02:57:26'),
(6, 1, 'DIFRZR', NULL, 1, '2026-10-19 02:57:26', '2026-10-19 02:57:26'),
(7, 1, 'DPIBN', NULL, 1, '2026-10-19 02:57:26', '2026-10-19 02:57:26'),
(8, 1, 'DIIBN', NULL, 1, '2026-10-19 02:57:26', '2026-10-19 02:57:26'),
(9, 1, 'DKKN', NULL, 1, '2026-10-19 02:57:26', '2026-10-19 02:57:26'),
(10, 1, 'DP2FRZR', NULL, 1, '2026-10-19 02:57:26', '2026-10-19 02:57:26'),
(11, 1, 'DP2IBN', NULL, 1, '2026-10-19 02:57:26', '2026-10-19 02:57:26'),
(12, 1, 'P2STPFRZR', NULL, 1, '2026-10-19 02:57:26', '2026-10-19 02:57:26'),
(13, 1, 'P2STPIBN', NULL, 1, '2026-10-19 02:57:26', '2026-10-19 02:57:26'),
(14, 1, 'BOU', NULL, 1, '2026-10-19 02:57:26', '2026-10-19 02:57:26'),
(15, 1, 'BPIK', NULL, 1, '2026-10-19 02:57:26', '2026-10-19 02:57:26'),
(16, 1, 'BHKK', NULL, 1, '2026-10-19 02:57:26', '2026-10-19 02:57:26'),
(17, 1, 'Inspektorat', NULL, 1, '2026-10-19 02:57:26', '2026-10-19 02:57:26'),
(18, 1, 'BDL', NULL, 1, '2026-10-19 02:57:26', '2026-10-19 02:57:26');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('perwakilan_unit','admin_ortala','user_biasa') NOT NULL DEFAULT 'user_biasa',
  `unit_kerja_id` bigint(20) UNSIGNED DEFAULT NULL,
  `foto_profil` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `last_login_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `berita`
--
ALTER TABLE `berita`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `idx_berita_status` (`status`,`tanggal_publikasi`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `berita_media`
--
ALTER TABLE `berita_media`
  ADD PRIMARY KEY (`id`),
  ADD KEY `berita_id` (`berita_id`);

--
-- Indexes for table `cfm`
--
ALTER TABLE `cfm`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_cfm_pp` (`peta_proses_id`),
  ADD KEY `fk_cfm_sp` (`sub_proses_id`);

--
-- Indexes for table `cfm_unit_kerja`
--
ALTER TABLE `cfm_unit_kerja`
  ADD PRIMARY KEY (`cfm_id`,`unit_kerja_id`),
  ADD KEY `unit_kerja_id` (`unit_kerja_id`);

--
-- Indexes for table `keterangan`
--
ALTER TABLE `keterangan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lembaga`
--
ALTER TABLE `lembaga`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kode` (`kode`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_notif_user` (`user_id`,`is_read`),
  ADD KEY `sop_id` (`sop_id`);

--
-- Indexes for table `pengumuman`
--
ALTER TABLE `pengumuman`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `peta_proses`
--
ALTER TABLE `peta_proses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_pp_ket` (`keterangan_id`);

--
-- Indexes for table `peta_proses_unit_kerja`
--
ALTER TABLE `peta_proses_unit_kerja`
  ADD PRIMARY KEY (`peta_proses_id`,`unit_kerja_id`),
  ADD KEY `unit_kerja_id` (`unit_kerja_id`);

--
-- Indexes for table `sop`
--
ALTER TABLE `sop`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_sop_status` (`approval_status`,`status_berlaku`),
  ADD KEY `idx_sop_tahun` (`tahun_terbit`),
  ADD KEY `fk_sop_lembaga` (`lembaga_id`),
  ADD KEY `fk_sop_unit` (`unit_kerja_id`),
  ADD KEY `fk_sop_pp` (`peta_proses_id`),
  ADD KEY `fk_sop_sp` (`sub_proses_id`),
  ADD KEY `fk_sop_cfm` (`cfm_id`),
  ADD KEY `fk_sop_up` (`uploaded_by`),
  ADD KEY `fk_sop_ap` (`approved_by`);

--
-- Indexes for table `sop_approval_log`
--
ALTER TABLE `sop_approval_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sop_id` (`sop_id`),
  ADD KEY `actor_id` (`actor_id`);

--
-- Indexes for table `sub_proses`
--
ALTER TABLE `sub_proses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_sp_pp` (`peta_proses_id`);

--
-- Indexes for table `sub_proses_unit_kerja`
--
ALTER TABLE `sub_proses_unit_kerja`
  ADD PRIMARY KEY (`sub_proses_id`,`unit_kerja_id`),
  ADD KEY `unit_kerja_id` (`unit_kerja_id`);

--
-- Indexes for table `unit_kerja`
--
ALTER TABLE `unit_kerja`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_unit_lembaga` (`lembaga_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `fk_user_unit` (`unit_kerja_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `berita`
--
ALTER TABLE `berita`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `berita_media`
--
ALTER TABLE `berita_media`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cfm`
--
ALTER TABLE `cfm`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `keterangan`
--
ALTER TABLE `keterangan`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `lembaga`
--
ALTER TABLE `lembaga`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pengumuman`
--
ALTER TABLE `pengumuman`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `peta_proses`
--
ALTER TABLE `peta_proses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sop`
--
ALTER TABLE `sop`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sop_approval_log`
--
ALTER TABLE `sop_approval_log`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sub_proses`
--
ALTER TABLE `sub_proses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `unit_kerja`
--
ALTER TABLE `unit_kerja`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `berita`
--
ALTER TABLE `berita`
  ADD CONSTRAINT `berita_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `berita_media`
--
ALTER TABLE `berita_media`
  ADD CONSTRAINT `berita_media_ibfk_1` FOREIGN KEY (`berita_id`) REFERENCES `berita` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `cfm`
--
ALTER TABLE `cfm`
  ADD CONSTRAINT `fk_cfm_pp` FOREIGN KEY (`peta_proses_id`) REFERENCES `peta_proses` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_cfm_sp` FOREIGN KEY (`sub_proses_id`) REFERENCES `sub_proses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `cfm_unit_kerja`
--
ALTER TABLE `cfm_unit_kerja`
  ADD CONSTRAINT `cfm_unit_kerja_ibfk_1` FOREIGN KEY (`cfm_id`) REFERENCES `cfm` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cfm_unit_kerja_ibfk_2` FOREIGN KEY (`unit_kerja_id`) REFERENCES `unit_kerja` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_2` FOREIGN KEY (`sop_id`) REFERENCES `sop` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `pengumuman`
--
ALTER TABLE `pengumuman`
  ADD CONSTRAINT `pengumuman_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `peta_proses`
--
ALTER TABLE `peta_proses`
  ADD CONSTRAINT `fk_pp_ket` FOREIGN KEY (`keterangan_id`) REFERENCES `keterangan` (`id`);

--
-- Constraints for table `peta_proses_unit_kerja`
--
ALTER TABLE `peta_proses_unit_kerja`
  ADD CONSTRAINT `peta_proses_unit_kerja_ibfk_1` FOREIGN KEY (`peta_proses_id`) REFERENCES `peta_proses` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `peta_proses_unit_kerja_ibfk_2` FOREIGN KEY (`unit_kerja_id`) REFERENCES `unit_kerja` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `sop`
--
ALTER TABLE `sop`
  ADD CONSTRAINT `fk_sop_ap` FOREIGN KEY (`approved_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_sop_cfm` FOREIGN KEY (`cfm_id`) REFERENCES `cfm` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_sop_lembaga` FOREIGN KEY (`lembaga_id`) REFERENCES `lembaga` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_sop_pp` FOREIGN KEY (`peta_proses_id`) REFERENCES `peta_proses` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_sop_sp` FOREIGN KEY (`sub_proses_id`) REFERENCES `sub_proses` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_sop_unit` FOREIGN KEY (`unit_kerja_id`) REFERENCES `unit_kerja` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_sop_up` FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `sop_approval_log`
--
ALTER TABLE `sop_approval_log`
  ADD CONSTRAINT `sop_approval_log_ibfk_1` FOREIGN KEY (`sop_id`) REFERENCES `sop` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sop_approval_log_ibfk_2` FOREIGN KEY (`actor_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `sub_proses`
--
ALTER TABLE `sub_proses`
  ADD CONSTRAINT `fk_sp_pp` FOREIGN KEY (`peta_proses_id`) REFERENCES `peta_proses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `sub_proses_unit_kerja`
--
ALTER TABLE `sub_proses_unit_kerja`
  ADD CONSTRAINT `sub_proses_unit_kerja_ibfk_1` FOREIGN KEY (`sub_proses_id`) REFERENCES `sub_proses` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sub_proses_unit_kerja_ibfk_2` FOREIGN KEY (`unit_kerja_id`) REFERENCES `unit_kerja` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `unit_kerja`
--
ALTER TABLE `unit_kerja`
  ADD CONSTRAINT `fk_unit_lembaga` FOREIGN KEY (`lembaga_id`) REFERENCES `lembaga` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_user_unit` FOREIGN KEY (`unit_kerja_id`) REFERENCES `unit_kerja` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
