<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>My Tasks - Professional Modern UI</title>

    <!-- Bootstrap & Font Awesome -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">

    <!-- Custom Styles -->
    <link href="../css/dashboard.css" rel="stylesheet">
    <link href="../css/sidebar.css" rel="stylesheet">
    <link href="../css/bottomnav.css" rel="stylesheet">
    <link rel="stylesheet" href="../css/mytasks.css">
    <link href="../css/update-form.css" rel="stylesheet">
    <link href="../css/notification.css" rel="stylesheet">


</head>

<body>
    <div class="d-flex flex-column flex-lg-row min-vh-100">
        <!-- Sidebar -->
        <?php include 'sidebar.php'; ?>

        <!-- Main Content -->
        <div class="flex-grow-1 p-3 bg-light">
            <!-- Header Navigation -->
            <?php include 'header.php'; ?>

            <main class="container-fluid py-4">
                <div class="row">
                    <div class="col-12">
                        <?php include 'all-notification.php' ?>
                    </div>
                </div>
            </main>

            <!-- New Task Modal -->
            <?php include 'new-task-form.php'; ?>

            <!-- Update Task Modal -->

        </div>

        <!-- Bottom Navigation -->
        <?php include 'bottomnav.php'; ?>
    </div>

    <!-- JavaScript Files -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"></script>
    <script src="../js/theme.js"></script>
    <script src="../js/script.js"></script>

    <!-- Firebase & Auth Modules -->
    <script type="module" src="../js/firebase.js"></script>
    <script type="module" src="../js/auth.js"></script>
    <script type="module" src="../js/logout.js"></script>

    <!-- Task Management Modules -->
    <script type="module" src="../js/notification.js"></script>
    <script type="module" src="../js/tasks.js"></script>
    <script type="module" src="../js/add-task.js"></script>
    <script type="module" src="../js/futuretasks.js"></script>
    <script type="module" src="../js/all-notifications.js"></script>


    <!-- Toast Notification -->
    <?php include 'toast.php'; ?>
</body>

</html>